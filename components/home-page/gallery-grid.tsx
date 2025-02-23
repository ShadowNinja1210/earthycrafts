"use client";

import { useState, useEffect, useMemo } from "react";
import { imgPlaceholder } from "@/public/assets/some-data";
import Image from "next/image";
import Link from "next/link";

export default function GalleryGrid() {
  const images = useMemo(
    () => [
      { id: 1, image: "", aspect: "portrait", productLink: "/" },
      { id: 2, image: "", aspect: "portrait", productLink: "/" },
      { id: 3, image: "", aspect: "landscape", productLink: "/" },
      { id: 4, image: "", aspect: "landscape", productLink: "/" },
      { id: 5, image: "", aspect: "portrait", productLink: "/" },
      { id: 6, image: "", aspect: "landscape", productLink: "/" },
      { id: 7, image: "", aspect: "landscape", productLink: "/" },
      { id: 8, image: "", aspect: "landscape", productLink: "/" },
      { id: 9, image: "", aspect: "landscape", productLink: "/" },
      { id: 10, image: "", aspect: "portrait", productLink: "/" },
      { id: 11, image: "", aspect: "landscape", productLink: "/" },
      { id: 12, image: "", aspect: "landscape", productLink: "/" },
      { id: 13, image: "", aspect: "landscape", productLink: "/" },
      { id: 14, image: "", aspect: "landscape", productLink: "/" },
      { id: 15, image: "", aspect: "landscape", productLink: "/" },
    ],
    []
  );

  const [visibleImages, setVisibleImages] = useState(images);

  useEffect(() => {
    const updateVisibleImages = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Small devices
        setVisibleImages(images.slice(0, 5));
      } else if (width < 1024) {
        // Medium devices
        setVisibleImages(images.slice(0, 10));
      } else {
        // Large devices
        setVisibleImages(images.slice(0, 14));
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

      <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
        {visibleImages.map((image) => (
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

            <div className="absolute inset-0 transition-all duration-300 group-hover:bg-black/30" />
          </Link>
        ))}
      </div>
    </div>
  );
}
