"use client";

import type { IGallery } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StoneSlide from "./components/stone-slide";
import { Button } from "../ui/button";
import { PinterestPin, PinterestSkeleton } from "../gallery-grid";
import { useEffect, useState } from "react";

export default function InspirationPage() {
  const { data: images = [], isLoading } = useQuery<IGallery[]>({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const response = await fetch("/api/gallery");
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
        setVisibleImages(images.slice(0, 9));
      }
    };

    updateVisibleImages(); // Initial check
    window.addEventListener("resize", updateVisibleImages);

    return () => {
      window.removeEventListener("resize", updateVisibleImages);
    };
  }, [images]);

  return (
    <div className=" space-y-16 lg:px-16 md:px-8 px-4 py-4 min-h-screen ">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">Know about our Stones</h1>

        <StoneSlide />

        <Link href="/stones" className="mx-auto text-base font-medium flex items-center mt-6">
          <Button className=" w-full mx-auto max-w-72" variant={"outline"}>
            View all <ArrowRight size={16} className=" ml-2" />
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">Gallery</h1>

        {isLoading ? (
          <PinterestSkeleton />
        ) : visibleImages.length <= 0 || !images ? (
          <p className="text-center min-h-screen content-center w-full">No Results</p>
        ) : (
          <div className="pinterest-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {visibleImages.map((image) => (
              <PinterestPin key={image._id.toString()} image={{ ...image, _id: image._id.toString() }} />
            ))}
          </div>
        )}

        <Link href="/gallery" className="mx-auto text-base font-medium flex items-center mt-6">
          <Button className=" w-full mx-auto max-w-72" variant={"outline"}>
            View all <ArrowRight size={16} className=" ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
