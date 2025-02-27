"use client";

import { IGallery } from "@/lib/schema";
import { imgPlaceholder } from "@/public/assets/some-data";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import GalleryDialog from "./components/gallery-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DashboardGallery() {
  const queryClient = useQueryClient();

  const { data: images = [], isLoading } = useQuery<IGallery[]>({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const response = await fetch("/api/gallery");
      return response.json();
    },
  });

  const deleteImage = useMutation<void, unknown, { _id: string }>({
    mutationKey: ["gallery-images"],
    mutationFn: async ({ _id }) => {
      const response = await fetch(`/api/gallery/${_id}`, {
        method: "DELETE",
      });
      console.log(response.status);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-images"] }); // 🔄 Refetch after delete
    },
  });

  return (
    <main className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Gallery</h1>

        <GalleryDialog />
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]"
      >
        {isLoading ? (
          <p className="text-center min-h-screen content-center w-full">Loading...</p>
        ) : images.length <= 0 || !images ? (
          <p className="text-center min-h-screen content-center w-full">No Results</p>
        ) : (
          images?.map((image: IGallery) => (
            <div
              key={image.id}
              className={`relative group ${image.aspect === "portrait" ? "row-span-2" : "row-span-1"}`}
            >
              {/* ✅ Link now ONLY wraps the image */}
              <Link href={image.productLink} className={`block`}>
                <Image
                  src={image.image || imgPlaceholder}
                  alt={`Design showcase ${image.id}`}
                  placeholder="blur"
                  blurDataURL={imgPlaceholder}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </Link>

              {/* ✅ Buttons are OUTSIDE the Link, preventing unwanted navigation */}
              <div
                className="absolute bottom-0 right-0 w-full rounded-2xl  flex gap-4 items-center justify-center h-28 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300"
                onClick={(e) => e.stopPropagation()} // Stops link navigation
              >
                <GalleryDialog edit={image} />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Image</AlertDialogTitle>
                      <AlertDialogDescription>Are you sure you want to delete this image?</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteImage.mutate({ _id: image._id.toString() })}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
