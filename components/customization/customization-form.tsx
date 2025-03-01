"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { FileUpload } from "../file-upload";
import { Button } from "../ui/button";
import { AtSign, FileImage, MessageSquare, PhoneCall, SendHorizonal, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { customizationPost } from "@/lib/api";

export type CustomizationFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  url: string;
};

const customFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(8),
  message: z.string().min(10),
  url: z.string().url(),
});

export default function CustomizationForm() {
  const [hasMounted, setHasMounted] = useState(false);

  const customizationMutate = useMutation({
    mutationKey: ["customization"],
    mutationFn: async (formData: CustomizationFormValues) => customizationPost(formData),
    onSuccess: () => {
      console.info("Customization request added successfully!");
      form.reset();
      // You can refetch queries or update UI here
    },
    onError: (error) => {
      console.error("Error adding customization request:", error);
    },
  });

  const form = useForm<z.infer<typeof customFormSchema>>({
    resolver: zodResolver(customFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      url: "",
    },
  });

  // Use useEffect to set mounted state after the component has been hydrated
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const onSubmit = (values: z.infer<typeof customFormSchema>) => {
    customizationMutate.mutate(values);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customization Form</CardTitle>
        <CardDescription>Fill in the form to get your customized product</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <User className="inline-flex mr-2 w-4" />
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <AtSign className="inline-flex mr-2 w-4" />
                    E-mail Address
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <PhoneCall className="inline-flex mr-2 w-4" />
                    Contact Number
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your contact number" {...field} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <MessageSquare className="inline-flex  mr-2 w-4" />
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {hasMounted && (
              <FormField
                name="url"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <FileImage className="inline-flex mr-2 w-4" />
                      Upload File
                    </FormLabel>
                    <FormControl>
                      <FileUpload onChange={field.onChange} value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <CardFooter>
              <Button className="w-full">
                Send <SendHorizonal />
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
