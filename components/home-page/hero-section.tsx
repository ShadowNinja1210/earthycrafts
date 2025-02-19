"use client";

import BackgroundVideo from "@/components/video/background-video";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  const text = "More than just an acoustic panel, a symphony of natural stone and design.";
  const exploreText = "Explore";

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="relative">
      {/* Landscape Intro Video */}
      <BackgroundVideo
        src="/videos/intro-landscape.MP4"
        className="md:absolute md:block hidden top-0 right-0 brightness-75 z-0"
      />

      {/* Portrait Intro Video */}
      <BackgroundVideo
        src="/videos/intro-portrait.mp4"
        className="md:hidden absolute top-0 right-0 brightness-75 z-0"
      />

      <div className="z-10 text-white drop-shadow-lg h-screen flex flex-col gap-2 items-center justify-center text-center">
        {/* Earthycrafts Logo */}
        <Image
          src="/images/logo-white.svg"
          className="sm:scale-100 scale-[0.8]"
          width={400}
          height={400}
          alt="Earthycrafts logo"
        />
        {/* Tag line */}
        <motion.p className=" text-lg sm:text-3xl md:text-4xl font-bold max-w-[700px] " aria-label={text}>
          {text.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.03, duration: 0.5 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>
        {/* Explore Action Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: text.length * 0.03 + 0.5 }}>
          <Link
            className="px-6 py-1 rounded-full gap-0.5 flex items-center bg-transparent hover:bg-black/20 text-white border-2 group"
            href="/products"
          >
            {exploreText.split("").map((char, index) => (
              <motion.span
                key={`explore-${char}-${index}`}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: text.length * 0.03 + 0.5 + index * 0.05, duration: 0.5 }}
              >
                {char}
              </motion.span>
            ))}
            <ArrowRight className="w-0 inline-flex group-hover:w-5 transition-all duration-500" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
