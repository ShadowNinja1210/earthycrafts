"use client";

import { cn } from "@/lib/utils";
import { imgPlaceholder } from "@/public/assets/some-data";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export type GridLayoutProps = {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  link: string;
};

export default function GridLayout({
  categories,
  className,
  right = false,
}: {
  categories: GridLayoutProps[];
  className?: string;
  right?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
    <motion.div
      ref={ref}
      className={cn("grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1200px] mx-auto ", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {categories.map((category, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className={cn(
            "relative group overflow-hidden min-h-[340px] rounded-3xl",
            !right && index == 0 && categories.length !== 4
              ? "md:col-span-1 md:row-span-2 md:h-[696px] h-[340px]"
              : right && index == 1 && categories.length !== 4
              ? "md:col-span-1 md:row-span-2 md:h-[696px] h-[340px]"
              : "h-[340px]"
          )}
        >
          <Link href={category.link}>
            <div className="relative w-full h-full group">
              {category.videoUrl.includes(".mp4") ? (
                <video autoPlay muted loop>
                  <source src={category.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={category.videoUrl || imgPlaceholder}
                  alt="Garden and landscaping showcase"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={imgPlaceholder}
                  fill
                />
              )}
              <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/50" />

              <div className="absolute bottom-0 left-0 p-6 text-white flex justify-between w-full items-end">
                <div>
                  <p className="text-sm mb-2">{category.description}</p>
                  <h2 className="text-2xl md:text-3xl font-semibold">{category.title}</h2>
                </div>
                <ArrowRight className="w-0 mb-1 group-hover:w-10 transition-all duration-500" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
