"use client";

import Loader from "@/components/loaders/loader";
import { useRouter } from "next/navigation";

export default function IntroLoader() {
  const videoSrc = "/videos/intro-landscape.MP4"; // Replace with your video path

  const router = useRouter();

  return (
    <main>
      <Loader onLoadingComplete={() => router.push("/home")} videoSrc={videoSrc} />
    </main>
  );
}
