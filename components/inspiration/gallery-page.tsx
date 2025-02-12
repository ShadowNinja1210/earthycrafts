"use client";

import type { IGallery } from "@/lib/schema";
import { imgPlaceholder } from "@/public/assets/some-data";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

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

  const containerRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="container mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold mb-6">Gallery</h1>

        {isLoading ? (
          <p className="text-center min-h-[80vh] flex items-center justify-center w-full">Loading...</p>
        ) : images.length <= 0 || !images ? (
          <p className="text-center min-h-[80vh] flex items-center justify-center w-full">No Results</p>
        ) : (
          <motion.div
            ref={containerRef}
            className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {images?.map((image: IGallery) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                className={`relative overflow-hidden group rounded-2xl ${
                  image.aspect === "portrait" ? "row-span-2" : "row-span-1"
                }`}
              >
                <Link href={image.productLink} className="block w-full h-full">
                  <Image
                    src={image.image || imgPlaceholder}
                    alt={`Design showcase ${image.id}`}
                    placeholder="blur"
                    blurDataURL={imgPlaceholder}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  <div className="absolute inset-0 transition-all duration-300 group-hover:bg-black/30" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
