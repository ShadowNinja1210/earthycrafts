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
      setVideoSrc(
        isPortrait
          ? "https://bseuburnlk.ufs.sh/f/qq9xtZ1seAvyvnez94u9dIKFSu3x2U5kXC7s6GO4jaWgZEqT"
          : "https://bseuburnlk.ufs.sh/f/qq9xtZ1seAvycvd2SwJuyfq493Yi7VxRAZmMlNvjh6CD5LP8"
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
