"use client";

import type { IGallery } from "@/lib/schema";
import { imgPlaceholder } from "@/public/assets/some-data";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import StoneSlide from "./components/stone-slide";
import { Button } from "../ui/button";

export default function InspirationPage() {
  const { data: images = [], isLoading } = useQuery<IGallery[]>({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const response = await fetch("/api/gallery");
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
          <p className="text-center min-h-96 flex items-center justify-center w-full">Loading...</p>
        ) : images.length <= 0 || !images ? (
          <p className="text-center min-h-96 flex items-center justify-center w-full">No Results</p>
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
                  image.aspect === "landscape" ? "row-span-2" : "row-span-1"
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

        <Link href="/gallery" className="mx-auto text-base font-medium flex items-center mt-6">
          <Button className=" w-full mx-auto max-w-72" variant={"outline"}>
            View all <ArrowRight size={16} className=" ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
