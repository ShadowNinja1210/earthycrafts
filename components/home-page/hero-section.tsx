// pages/index.js

import BackgroundVideo from "@/components/video/background-video";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <main className="relative">
      {/* public/videos/intro-landscape.MP4 */}
      <BackgroundVideo
        src="/videos/intro-landscape.MP4"
        className="md:absolute md:block hidden top-0 right-0 brightness-75 z-0"
      />
      <BackgroundVideo
        src="/videos/intro-portrait.mp4"
        className="md:hidden absolute top-0 right-0 brightness-75 z-0"
      />

      <div className="z-10 text-white drop-shadow-lg h-screen flex flex-col gap-2 items-center justify-center text-center ">
        <Image src="/images/logo-white.svg" width={400} height={400} alt="Earthycrafts logo" />
        <p className="text-3xl md:text-4xl font-bold max-w-[700px] ml-16">
          More than just an acoustic panel, a symphony of natural stone and design.
        </p>
        <Link
          className="px-6 py-1 rounded-full gap-2 flex items-center bg-transparent hover:bg-black/20 text-white border-2  group"
          href="/products"
        >
          <span className="text-lg">Explore</span>
          <ArrowRight className=" w-0 inline-flex group-hover:w-5 transition-all duration-500" />
        </Link>
      </div>
    </main>
  );
}
