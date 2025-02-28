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
      setVideoSrc(
        isPortrait
          ? "https://bseuburnlk.ufs.sh/f/qq9xtZ1seAvyB0lthvV9ITr7yklD1YGSQtmnX4g863vZubdo"
          : "https://bseuburnlk.ufs.sh/f/qq9xtZ1seAvyDC6bq7204QxyMCSseTql85UNaPzVoBt1IgpE"
      );
    };

    const timeout = setTimeout(() => {
      router.replace("/home");
    }, 3000);

    updateVideoSource(); // Set video source on mount
    window.addEventListener("resize", updateVideoSource); // Detect screen changes

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateVideoSource);
    };
  }, [router]);

  if (!videoSrc) return null; // Prevent rendering Loader until video source is determined

  return (
    <main>
      <Loader onLoadingComplete={() => router.replace("/home")} videoSrc={videoSrc} />
    </main>
  );
}
