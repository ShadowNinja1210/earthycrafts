"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoaderProps {
  onLoadingComplete: () => void;
  videoSrc: string;
}

export default function Loader({ onLoadingComplete, videoSrc }: LoaderProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.preload = "auto";

    video.oncanplaythrough = () => {
      setVideoLoaded(true);
      setTimeout(() => {
        setShowLoader(false);
        console.log("Video ready!", videoSrc);
        onLoadingComplete();
      }, 2500);
    };

    video.onerror = () => {
      console.error("Failed to load video:", video.src);
    };

    // Fetch the video to force it to load faster on Vercel
    fetch(videoSrc, { cache: "reload" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to preload video");
        console.log("Video preloaded:", videoSrc);
      })
      .catch(console.error);

    return () => {
      video.oncanplaythrough = null;
      video.onerror = null;
    };
  }, [videoSrc, onLoadingComplete]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="relative w-full max-w-md px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <Image
                src="/images/logo.svg"
                alt="Earthycrafts Logo"
                width={500}
                height={120}
                className="w-full"
                priority
              />
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: videoLoaded ? "100%" : "90%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute -bottom-8 left-0 h-0.5 bg-black/30"
              >
                <motion.div
                  className="absolute top-0 left-0 h-full w-full bg-black"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: videoLoaded ? 1 : 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  style={{ originX: 0 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
