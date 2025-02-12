import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ImageCard({ url, i, className }: { url: string; i: number; className?: string }) {
  return (
    <div
      key={i}
      className={cn(
        "group relative h-80 overflow-hidden rounded-lg shadow-xl transform transition-transform hover:-translate-y-2",
        className
      )}
      style={{
        transform: `rotate(${Math.random() * 6 - 3}deg)`,
      }}
    >
      <div className="absolute inset-0 bg-white p-3">
        <Image
          src={url}
          alt={`Craft image ${i}`}
          width={400}
          height={300}
          className="w-full h-full object-cover rounded border-8 border-white"
        />
      </div>
    </div>
  );
}
