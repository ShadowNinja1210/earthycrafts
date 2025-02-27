import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IGallery } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GalleryForm from "./gallery-form";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const GalleryFormSchema = z.object({
  image: z.string(),
  productCode: z.string(),
  aspect: z.enum(["landscape", "portrait"]),
});

export default function GalleryDialog({
  edit,
  onClick,
  className,
}: {
  edit?: IGallery;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(GalleryFormSchema),
    defaultValues: edit
      ? {
          image: edit.image,
          productCode: edit.productLink.split("/").pop(),
          aspect: edit.aspect,
        }
      : {
          image: "",
          productCode: "",
          aspect: "",
        },
  });

  const postingImage = useMutation<void, unknown, z.infer<typeof GalleryFormSchema>>({
    mutationKey: ["gallery-images"],
    mutationFn: async (values) => {
      const response = await fetch("/api/gallery", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);
      return response.json();
    },
    onSuccess: () => {
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] }); // 🔄 Refetch after delete
    },
  });

  const editImage = useMutation<void, unknown, { id: string } & z.infer<typeof GalleryFormSchema>>({
    mutationKey: ["gallery-images"],
    onSuccess: () => {
      form.reset();
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] }); // 🔄 Refetch after delete
    },
    mutationFn: async ({ id, ...values }) => {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);
      return response.json();
    },
  });

  const onSubmit = (values: z.infer<typeof GalleryFormSchema>) => {
    try {
      console.log(values);
      if (edit) {
        editImage.mutate({ ...values, id: edit._id.toString() });
        return;
      } else {
        postingImage.mutate(values);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        form.reset();
        setOpen(!open);
      }}
    >
      <DialogTrigger className={cn("", className)} onClick={onClick} asChild>
        <Button variant={edit ? "outline" : "default"}>{edit ? "Edit" : "Add New Image"}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{edit ? "Update the Image" : "Add New Image"}</DialogTitle>
          <DialogDescription>{`Fill out the details to ${
            edit ? "update the image" : "add new image"
          } to the gallery.`}</DialogDescription>
        </DialogHeader>

        <GalleryForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
