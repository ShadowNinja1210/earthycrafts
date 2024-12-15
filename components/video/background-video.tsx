import { cn } from "@/lib/utils";

const BackgroundVideo = ({ src, className }: { src: string; className?: string }) => {
  return (
    <video
      className={cn(" top-0 left-0 w-screen h-screen object-cover -z-10", className)}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
