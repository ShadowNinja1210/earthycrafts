"use client";

import { useQuery } from "@tanstack/react-query";
import type { IGallery } from "@/lib/schema";
import { PinterestPin, PinterestSkeleton } from "../gallery-grid";
import { useEffect, useState } from "react";

export default function GalleryGrid() {
  const { data: images = [], isLoading } = useQuery<IGallery[]>({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const response = await fetch("/api/gallery");
      if (response.status === 404) return [];
      return response.json();
    },
  });

  const [visibleImages, setVisibleImages] = useState(images);

  useEffect(() => {
    const updateVisibleImages = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Small devices
        setVisibleImages(images.slice(0, 5));
      } else if (width < 1024) {
        // Medium devices
        setVisibleImages(images.slice(0, 9));
      } else {
        // Large devices
        setVisibleImages(images.slice(0, 12));
      }
    };

    updateVisibleImages(); // Initial check
    window.addEventListener("resize", updateVisibleImages);

    return () => {
      window.removeEventListener("resize", updateVisibleImages);
    };
  }, [images]);

  return (
    <div className="container mx-auto lg:px-16 md:px-8 px-4 py-12">
      <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-center max-w-3xl mx-auto mb-12 leading-tight">
        We help your space sing with a mix of personal and aesthetic design that is stylish and functional.
      </h1>

      {isLoading ? (
        <PinterestSkeleton />
      ) : (
        <div className="pinterest-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {visibleImages.map((image) => (
            <PinterestPin key={image._id.toString()} image={{ ...image, _id: image._id.toString() }} />
          ))}
        </div>
      )}
    </div>
  );
}
