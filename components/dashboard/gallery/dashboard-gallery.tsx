"use client";

import { IGallery } from "@/lib/schema";
import { imgPlaceholder } from "@/public/assets/some-data";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import GalleryDialog from "./components/gallery-dialog";
import { Button } from "@/components/ui/button";

export default function DashboardGallery() {
  const { data: images = [], isLoading } = useQuery<IGallery[]>({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const response = await fetch("/api/gallery");
      return response.json();
    },
  });

  console.log(images);

  return (
    <main className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Gallery</h1>

        <GalleryDialog />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
        {isLoading ? (
          <p className="text-center min-h-screen content-center w-full">Loading...</p>
        ) : images.length <= 0 || !images ? (
          <p className="text-center min-h-screen content-center w-full">No Results</p>
        ) : (
          images?.map((image: IGallery) => (
            <Link
              href={image.productLink}
              key={image.id}
              className={`relative overflow-hidden group rounded-2xl ${
                image.aspect === "landscape" ? "row-span-2" : "row-span-1"
              }`}
            >
              <Image
                src={image.image || imgPlaceholder}
                alt={`Design showcase ${image.id}`}
                placeholder="blur"
                blurDataURL={imgPlaceholder}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              <div className="absolute flex gap-4 items-center justify-center w-full h-full inset-0 transition-all duration-300 group-hover:bg-black/70">
                <Button className="group-hover:flex hidden" variant="outline">
                  Edit
                </Button>
                <Button className="group-hover:flex hidden" variant="destructive">
                  Delete
                </Button>
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
