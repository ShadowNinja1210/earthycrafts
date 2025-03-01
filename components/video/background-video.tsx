import { cn } from "@/lib/utils";

const BackgroundVideo = ({ src, className, format = "mp4" }: { src: string; className?: string; format?: string }) => {
  return (
    <video
      className={cn(" top-0 left-0 w-screen h-screen object-cover -z-10", className)}
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      preload="auto"
    >
      <source src={src} type={`video/${format}`} />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
