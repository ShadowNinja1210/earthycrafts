"use client";

import { useState } from "react";
import Loader from "@/components/loaders/loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const videoSrc = "/your-video.mp4"; // Replace with your video path

  return (
    <main>
      <Loader onLoadingComplete={() => setIsLoading(false)} videoSrc={videoSrc} />

      {/* Only render video when loading is complete */}
      {!isLoading && (
        <section className="relative h-screen">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Your hero content here */}
        </section>
      )}
    </main>
  );
}
