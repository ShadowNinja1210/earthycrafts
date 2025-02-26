"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/loaders/loader";
import { useRouter } from "next/navigation";

export default function IntroLoader() {
  const router = useRouter();
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const updateVideoSource = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      console.log("Screen orientation:", isPortrait ? "Portrait" : "Landscape");
      console.log("Screen size:", window.innerWidth, "x", window.innerHeight);
      setVideoSrc(isPortrait ? "/videos/intro-portrait.mp4" : "/videos/intro-landscape.mp4");
    };

    updateVideoSource(); // Set video source on mount
    window.addEventListener("resize", updateVideoSource); // Detect screen changes

    return () => {
      window.removeEventListener("resize", updateVideoSource);
    };
  }, []);

  if (!videoSrc) return null; // Prevent rendering Loader until video source is determined

  return (
    <main>
      <Loader onLoadingComplete={() => router.replace("/home")} videoSrc={videoSrc} />
    </main>
  );
}
