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
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GalleryForm from "./gallery-form";

const GalleryFormSchema = z.object({
  image: z.string(),
  productCode: z.string(),
  aspect: z.enum(["landscape", "portrait"]),
});

export default function GalleryDialog({ edit }: { edit?: IGallery }) {
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

  const onSubmit = (values: z.infer<typeof GalleryFormSchema>) => {
    console.log(values);

    const postedImage = useMutation({
      mutationKey: ["gallery-images"],
      mutationFn: async (values) => {
        const response = await fetch("/api/gallery", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.json();
      },
    });

    if (postedImage.isSuccess) {
      form.reset();
    }
  };

  return (
    <Dialog
      onOpenChange={() => {
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>Add New Image</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Image</DialogTitle>
          <DialogDescription>Fill out the details to add new image to the gallery.</DialogDescription>
        </DialogHeader>

        <GalleryForm form={form} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
