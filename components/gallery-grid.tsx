import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface IGallery {
  _id: string;
  image: string;
  productLink: string;
  aspect: "portrait" | "landscape";
}

const imgPlaceholder = "/path/to/placeholder.jpg";

export function PinterestPin({ image }: { image: IGallery }) {
  const [isHovered, setIsHovered] = useState(false);

  // Set aspect ratio based on the image's aspect property
  const aspectRatioClass =
    image.aspect === "portrait"
      ? "aspect-[3/4]" // Portrait images are taller (3:4 ratio)
      : "aspect-[4/3]"; // Landscape images are wider (4:3 ratio)

  return (
    <div
      className="pin-container mb-4 break-inside-avoid relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={image.productLink} className="block relative">
        <div className={`relative ${aspectRatioClass}`}>
          <Image
            src={image.image || imgPlaceholder}
            alt={`Design showcase ${image._id}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Pinterest-style overlay with actions */}
          <div
            className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
      </Link>
    </div>
  );
}

export function PinterestSkeleton() {
  // Create a mix of portrait and landscape skeletons
  const skeletonItems = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    aspect: i % 3 === 0 ? "portrait" : "landscape", // Mix of portrait and landscape
  }));

  return (
    <div className="pinterest-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
      {skeletonItems.map((item) => (
        <div
          key={item.id}
          className={`mb-4 break-inside-avoid rounded-xl overflow-hidden ${
            item.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
          }`}
        >
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}
