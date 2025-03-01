"use client";

import Image from "next/image";
import BackgroundVideo from "../video/background-video";
import { Rajdhani } from "next/font/google";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const craftingSections = [
  {
    image: "/images/about/about-1.jpg",
    title: "Traditional Stone Crafting",
    description:
      "Our skilled artisans carefully shape and carve natural stones using time-honored techniques passed down through generations, ensuring each piece maintains its authentic character.",
    imageLeft: true,
  },
  {
    image: "/images/about/about-2.jpg",
    title: "Modern Equipment & Precision",
    description:
      "We combine traditional craftsmanship with state-of-the-art equipment to achieve precise cuts and perfect finishes, maintaining the highest quality standards in every piece.",
    imageLeft: false,
  },
  {
    image: "/images/about/about-3.jpg",
    title: "Quality Control & Finishing",
    description:
      "Every piece undergoes rigorous quality checks and careful finishing touches, ensuring that each creation meets our exacting standards of excellence and durability.",
    imageLeft: true,
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent overflow-hidden">
      <div className="relative">
        <BackgroundVideo
          src="https://bseuburnlk.ufs.sh/f/qq9xtZ1seAvyUPYKmK6fAdBP8qeLX3MNxI1nOzSv0kTb42gQ"
          className="md:block hidden  z-50"
          format="webm"
        />
        <BackgroundVideo
          src="https://bseuburnlk.ufs.sh/f/qq9xtZ1seAvytKDkvEIXghJazymvGju9SwrqWxB5HKNiTM2l"
          className="md:hidden z-50"
          format="webm"
        />
      </div>

      {/* Content */}
      <div className="relative py-16">
        {/* Fixed OM symbol */}
        <div className="z-0 absolute top-1/2 -translate-y-1/2 inset-0 flex items-center justify-center opacity-50 pointer-events-none">
          <Image src="/images/om.svg" alt="OM symbol" width={800} height={800} />
        </div>

        {/* Header text */}
        <div className="max-w-3xl mx-auto text-center mb-20 px-4">
          <h1 className={`${rajdhani.className} text-3xl sm:text-4xl md:text-6xl font-bold text-[#4A3226] mb-6`}>
            Our Craft & Heritage
          </h1>
          <p className="text-lg md:text-xl text-[#6B4B3E] leading-relaxed">
            Transforming natural stones into timeless art, we blend traditional craftsmanship with modern design to
            create unique, handcrafted decor that inspires.
          </p>
        </div>

        {/* Alternating sections */}
        <div className="max-w-6xl mx-auto px-4 space-y-20">
          {craftingSections.map((section, index) => (
            <AnimatedSection key={index} section={section} />
          ))}
        </div>
      </div>
    </main>
  );
}

interface Section {
  image: string;
  title: string;
  description: string;
  imageLeft: boolean;
}

function AnimatedSection({ section }: { section: Section }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`flex flex-col ${
        section.imageLeft ? "md:flex-row" : "md:flex-row-reverse"
      } items-center gap-8 md:gap-16`}
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        <div
          className="group relative h-80 overflow-hidden rounded-lg shadow-xl transform transition-transform hover:-translate-y-2"
          style={{
            transform: `rotate(${Math.random() * 4 - 2}deg)`,
          }}
        >
          <div className="absolute inset-0 bg-white p-3">
            <Image
              src={section.image || "/placeholder.svg"}
              alt={section.title}
              width={400}
              height={300}
              className="w-full h-full object-cover rounded border-8 border-white"
            />
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className={`${rajdhani.className} text-2xl md:text-3xl font-bold text-[#4A3226] mb-4`}>{section.title}</h2>
        <p className="text-[#6B4B3E] leading-relaxed">{section.description}</p>
      </div>
    </motion.div>
  );
}
