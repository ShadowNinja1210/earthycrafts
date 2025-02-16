"use client";

import type { IGallery } from "@/lib/schema";
import { imgPlaceholder } from "@/public/assets/some-data";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const stones = [
  {
    name: "Agra Red",
    image: "",
    url: "/stone/agra-red",
  },
  {
    name: "Stone 1",
    image: "",
    url: "/stone/1",
  },
  {
    name: "Stone 1",
    image: "",
    url: "/stone/1",
  },
  {
    name: "Stone 1",
    image: "",
    url: "/stone/1",
  },
  {
    name: "Stone 1",
    image: "",
    url: "/stone/1",
  },
];

export default function InspirationPage() {
  const { data: images = [], isLoading } = useQuery<IGallery[]>({
    queryKey: ["gallery-images"],
    queryFn: async () => {
      const response = await fetch("/api/gallery");
      return response.json();
    },
  });
  const [visibleItems, setVisibleItems] = useState(5);

  const width = window.innerWidth;

  useEffect(() => {
    const updateItemsPerRow = () => {
      if (width >= 1024) {
        setVisibleItems(5);
      } else if (width >= 768) {
        console.log(width);
        setVisibleItems(4);
      } else if (width >= 1280) {
        setVisibleItems(3);
      } else if (width >= 480) {
        setVisibleItems(4);
      } else {
        setVisibleItems(4);
      }
    };

    updateItemsPerRow();
    window.addEventListener("resize", updateItemsPerRow);
    return () => window.removeEventListener("resize", updateItemsPerRow);
  }, [width]);

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
    <div className="container space-y-8 mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex justify-between items-center">
        Know about our Stones
        <Link href="/stones" className="text-base font-medium flex items-center group">
          View all <ArrowRight size={16} className="ml-2 group-hover:w-4 w-0 transition-all duration-300" />
        </Link>
      </h1>

      <div className="flex gap-4 flex-wrap justify-between mx-auto">
        {stones.slice(0, visibleItems).map(
          (stone, index) =>
            index < 5 && (
              <Link href={stone.url} key={index} className="group flex flex-col gap-2">
                <div className="rounded-md h-64 w-64 overflow-hidden object-center hover:shadow-md transition-all duration-300">
                  <Image
                    src={stone.image || imgPlaceholder}
                    alt={stone.name}
                    height={500}
                    width={500}
                    className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <p className="font-medium">{stone.name}</p>
              </Link>
            )
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-6 flex justify-between items-center">
          Gallery
          <Link href="/gallery" className="text-base font-medium flex items-center group">
            View all <ArrowRight size={16} className="ml-2 group-hover:w-4 w-0 transition-all duration-300" />
          </Link>
        </h1>

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
      </div>
    </div>
  );
}
