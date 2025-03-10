"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { IBlog } from "@/lib/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const blogSchema = z.object({
  title: z.string(),
  content: z.array(z.string()).nonempty(),
});

export default function BlogPage() {
  const { data: blogs = [], isLoading } = useQuery<IBlog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blog");
      return res.json();
    },
  });

  const queryClient = useQueryClient();

  // Form hook with zod resolver
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: [""], // Initialize with one empty content field
    },
  });

  // useFieldArray hook to handle dynamic content fields
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // @ts-expect-error: TypeScript does not recognize the dynamic content field name
    name: "content",
  });

  const onSubmit = useMutation({
    // Mutation key
    mutationKey: ["blogs"],

    // Create mutation function
    mutationFn: async (values: z.infer<typeof blogSchema>) => {
      const res = await fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.json();
    },

    // Success message
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      form.reset();
      toast({
        title: "Blog created successfully",
        description: "Your blog has been created successfully.",
      });
    },

    // Error message
    onError: () => {
      toast({
        title: "Failed to create blog",
        description: "An error occurred while creating your blog.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = useMutation({
    // Mutation key
    mutationKey: ["blogs"],

    // Delete mutation function
    mutationFn: async (id: string) => {
      try {
        const res = await fetch(`/api/blog${id}`, {
          method: "DELETE",
          body: JSON.stringify({ id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 404) {
          return [];
        }
        return res.json();
      } catch (error) {
        console.error("Error deleting blog:", error);
        return null;
      }
    },
    // Success message
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast({
        title: "Blog deleted successfully",
        description: "Your blog has been deleted successfully.",
      });
    },

    // Error message
    onError: () => {
      toast({
        title: "Failed to delete blog",
        description: "An error occurred while deleting your blog.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="px-4 w-full py-4">
      <h1 className="text-3xl font-bold uppercase mb-6 underline">Blogs</h1>

      {/* Blog Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => onSubmit.mutate(values))} className="space-y-4">
          <h2 className="text-2xl font-bold">Create a Blog</h2>
          {/* Blog Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold">Blog Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Title" className="max-w-96" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Blog Content (dynamic fields) */}
          <div>
            <FormLabel className="text-xl font-semibold">Content</FormLabel>
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`content.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} placeholder={`Content ${index + 1}`} />
                    </FormControl>
                    <div className="flex justify-end space-x-2 mt-2">
                      <Button type="button" variant="outline" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Add Content Button */}
          <Button type="button" onClick={() => append("")}>
            Add More Content
          </Button>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Submit Blog
          </Button>
        </form>
      </Form>

      <hr className="my-10 border-t-4 border-dashed" />

      {/* Blogs */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold">All Blogs</h2>
        <div className="mt-4 space-y-4">
          {isLoading ? (
            "Loading..."
          ) : !blogs.length || blogs.length === 0 ? (
            <div className="text-center content-center">
              <p>No blogs found</p>
            </div>
          ) : (
            blogs?.map((blog) => (
              <div key={blog.id} className="border p-4 rounded-lg">
                <div className="flex justify-between">
                  <h3 className="text-xl font-semibold">{blog.title}</h3>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogTitle>Delete Blog?</AlertDialogTitle>
                      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button variant="destructive" onClick={() => handleDelete.mutate(blog.id)}>
                            Delete
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <div className="mt-2  flex flex-col gap-1">
                  {blog.content.map((paras, index) => (
                    <p key={index}>{paras}</p>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
