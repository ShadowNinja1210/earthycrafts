"use client";

import { IGallery } from "@/lib/schema";
import { imgPlaceholder } from "@/public/assets/some-data";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function GalleryPage() {
  const { data: images = [], isLoading } = useQuery<IGallery[]>({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const response = await fetch("/api/gallery");
      if (response.status === 404) return [];
      console.log(response.json());
      return response.json();
    },
  });

  return (
    <main className="container">
      <h1 className="text-2xl font-bold">Gallery</h1>

      {isLoading ? (
        <p className="text-center min-h-[80vh] content-center w-full">Loading...</p>
      ) : images.length <= 0 || !images ? (
        <p className="text-center min-h-[80vh] content-center w-full">No Results</p>
      ) : (
        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
          {images?.map((image: IGallery) => (
            <Link
              href={image.productLink}
              key={image.id}
              className={`relative overflow-hidden group rounded-2xl ${
                image.aspect === "portrait" ? "row-span-2" : "row-span-1"
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

              <div className="absolute inset-0 transition-all duration-300 group-hover:bg-black/30" />
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
