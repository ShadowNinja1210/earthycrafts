"use client";

import type { IGallery } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import { PinterestPin, PinterestSkeleton } from "../gallery-grid";

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
    <main className="container mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold mb-6">Gallery</h1>

        {isLoading ? (
          <PinterestSkeleton />
        ) : images.length <= 0 || !images ? (
          <p className="text-center min-h-screen content-center w-full">No Results</p>
        ) : (
          <div className="pinterest-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {images.map((image) => (
              <PinterestPin key={image._id.toString()} image={{ ...image, _id: image._id.toString() }} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
