"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { imgPlaceholder } from "@/public/assets/some-data";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

interface PreviewItem {
  id: number;
  title: string;
  description?: string;
  image: string;
  type: "Inspiration" | "Primary Category" | "Secondary Category";
  link: string;
}

const previewItems: PreviewItem[] = [
  {
    id: 1,
    title: "Modern Living Room",
    image: "",
    type: "Inspiration",
    link: "/gallery",
  },
  {
    id: 2,
    title: "Cozy Bedroom",
    image: "",
    type: "Inspiration",
    link: "/gallery",
  },
  {
    id: 3,
    title: "Sleek Kitchen",
    image: "",
    type: "Inspiration",
    link: "/gallery",
  },
  {
    id: 4,
    title: "Design your home",
    description: "Handmade with love, each piece is as unique as its origin.",
    image: "/videos/categories/home.mp4",
    type: "Primary Category",
    link: "/products/home",
  },
  {
    id: 5,
    title: "Outdoor Spaces",
    description: "Productive workspace with ergonomic design",
    image: "/videos/categories/outdoor.mp4",
    type: "Primary Category",
    link: "/products/outdoor",
  },
  {
    id: 6,
    title: "Garden & Landscape",
    description: "Spa-like bathroom with premium fixtures and finishes",
    image: "/videos/categories/garden-landscape.mp4",
    type: "Primary Category",
    link: "/products/garden",
  },
  {
    id: 7,
    title: "Agra Red",
    description: "Productive workspace with ergonomic design",
    image: "/images/sub-categories/agra-red.jpg",
    type: "Secondary Category",
    link: "/products/agra-red",
  },
  {
    id: 8,
    title: "Beslana",
    description: "Comfortable outdoor seating area with modern furniture",
    image: "/images/sub-categories/beslana.jpg",
    type: "Secondary Category",
    link: "/products/beslana",
  },
  {
    id: 9,
    title: "Sandstone",
    description: "Elegant dining space with a large table and stylish chairs",
    image: "/videos/sub-categories/sandstone.mp4",
    type: "Secondary Category",
    link: "/products/sandstone",
  },
  {
    id: 10,
    title: "Bali",
    description: "Fun and colorful room designed for children",
    image: "/videos/sub-categories/bali.mp4",
    type: "Secondary Category",
    link: "/products/bali",
  },
  {
    id: 11,
    title: "Blue Pottery",
    description: "Cozy and welcoming guest bedroom",
    image: "/images/sub-categories/blue-pottery.jpg",
    type: "Secondary Category",
    link: "/products/blue-pottery",
  },
  {
    id: 12,
    title: "Tukdi Art",
    description: "Efficient laundry space with modern appliances",
    image: "/images/sub-categories/tukdi.jpg",
    type: "Secondary Category",
    link: "/products/tukdi",
  },
  {
    id: 13,
    title: "Temple",
    description: "Organized garage with storage solutions",
    image: "/images/sub-categories/temple.jpg",
    type: "Secondary Category",
    link: "/products/temple",
  },
  {
    id: 14,
    title: "White Marble",
    description: "Quiet home library with built-in bookshelves",
    image: "/images/sub-categories/white-marble.jpg",
    type: "Secondary Category",
    link: "/products/white-marble",
  },
  {
    id: 15,
    title: "Funiture",
    description: "Home gym with various exercise equipment",
    image: "/videos/sub-categories/furniture.mp4",
    type: "Secondary Category",
    link: "/products/furniture",
  },
  {
    id: 16,
    title: "Handicrafts",
    description: "Temperature-controlled wine storage room",
    image: "",
    type: "Secondary Category",
    link: "/products/handicrafts",
  },
];

export default function Explore() {
  const [activeItem, setActiveItem] = useState<PreviewItem | null>(null);
  const [inspirationItems, setInspirationItems] = useState<PreviewItem[]>([]);
  const [primaryCategoryItems, setPrimaryCategoryItems] = useState<PreviewItem[]>([]);
  const [secondaryCategoryItems, setSecondaryCategoryItems] = useState<PreviewItem[]>([]);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const inspirations = previewItems.filter((item) => item.type === "Inspiration");
    setInspirationItems(inspirations);
    const primaryCategories = previewItems.filter((item) => item.type === "Primary Category");
    setPrimaryCategoryItems(primaryCategories);
    const secondaryCategories = previewItems.filter((item) => item.type === "Secondary Category");
    setSecondaryCategoryItems(secondaryCategories);

    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight + 2);
      console.log(navbar.offsetHeight);
    }
  }, []);

  return (
    <HoverCard openDelay={150}>
      <HoverCardTrigger asChild className="group cursor-pointer hover:text-neutral-600 transition-all flex">
        <Link href="/products">
          Explore
          <ChevronDown className="group-hover:-rotate-180 transition-all duration-300 w-5" />
        </Link>
      </HoverCardTrigger>

      <HoverCardContent
        sideOffset={20}
        align="start"
        className=" flex flex-col gap-2 font-medium h-[90vh] w-screen rounded-none"
        style={{ height: `calc(100vh - ${navbarHeight}px)` }}
      >
        <div className="flex gap-20 p-4 max-w-screen-lg mx-auto">
          {/* Navigation Section */}
          <div className=" space-y-4">
            {/* ------------------- Inspiration Items ------------------- */}
            <div className=" flex justify-between">
              <h1 className="text-2xl font-bold font-serif">Inspiration</h1>
              <Link className=" group flex items-center gap-2 underline transition-all duration-300" href="/gallery">
                View all <ArrowRight className="w-0 group-hover:w-4 transition-all duration-300" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {inspirationItems.map((item) => (
                <Link
                  href={item.link}
                  key={item.id}
                  className={cn(
                    "rounded-lg cursor-pointer transition-all duration-300 w-[100px]",
                    activeItem?.id === item.id ? "shadow-lg scale-105  shadow-neutral-500 " : ""
                  )}
                  onMouseEnter={() => setActiveItem(item)}
                >
                  <Image
                    src={item.image || imgPlaceholder}
                    alt={item.title}
                    width={100}
                    height={300}
                    className={cn("rounded-lg object-cover w-[100px] h-[100px]")}
                  />
                </Link>
              ))}
            </div>
            {/* ------------------- Primary Category Items ------------------- */}
            <div className=" flex justify-between">
              <h1 className="text-2xl font-bold font-serif">Primary Category</h1>
              <Link className=" group flex items-center gap-2 underline transition-all duration-300" href="/products">
                View all <ArrowRight className="w-0 group-hover:w-4 transition-all duration-300" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {primaryCategoryItems.map((item) => (
                <Link
                  key={item.id}
                  onMouseEnter={() => setActiveItem(item)}
                  href={item.link}
                  className={cn(
                    " cursor-pointer h-32 w-fit overflow-hidden rounded-xl flex items-center transition-all duration-300",
                    activeItem?.id === item.id ? "shadow-lg scale-105 shadow-neutral-500 " : ""
                  )}
                >
                  <div className="h-[177px] relative">
                    <video muted loop width={100} height={200} className={cn("brightness-50")}>
                      <source src={item.image} />
                    </video>
                    <h3 className="text-center text-sm absolute text-white z-50 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            {/* ------------------- Secondary Category Items ------------------- */}
            <div className=" flex justify-between">
              <h1 className="text-2xl font-bold font-serif">Secondary Category</h1>
              <Link className=" group flex items-center gap-2 underline transition-all duration-300" href="/products">
                View all <ArrowRight className="w-0 group-hover:w-4 transition-all duration-300" />
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-x-20 gap-y-4 justify-items-center">
              {secondaryCategoryItems.map((item) => (
                <Link
                  key={item.id}
                  onMouseEnter={() => setActiveItem(item)}
                  href={item.link}
                  className={cn(
                    "cursor-pointer h-20 w-20 overflow-hidden rounded-full flex items-center transition-all duration-300",
                    activeItem?.id === item.id ? "shadow-lg scale-105 shadow-neutral-500 " : ""
                  )}
                >
                  {item.image.includes("videos") ? (
                    <div className="relative">
                      <video muted loop width={100} height={300} src={item.image} className={cn("brightness-50")}>
                        <source src={item.image} />
                      </video>
                      <h3 className="text-center text-sm absolute text-white z-50 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                        {item.title}
                      </h3>
                    </div>
                  ) : (
                    <div className=" relative">
                      <Image
                        src={item.image || imgPlaceholder}
                        alt={item.title}
                        width={200}
                        height={200}
                        className={cn("rounded-full h-20 w-20 overflow-hidden object-cover brightness-50")}
                      />
                      <h3 className="text-center text-sm absolute text-white z-50 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
                        {item.title}
                      </h3>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex-1 text-center">
            <div className="w-[500px] h-[60vh] p-6">
              {activeItem ? (
                <div className="space-y-6 h-full">
                  <div className="flex items-center justify-center overflow-hidden rounded-lg h-full w-[300px] mx-auto">
                    {activeItem.image.includes("videos") ? (
                      <div className="w-[500px]">
                        <video
                          autoPlay
                          muted
                          loop
                          width={500}
                          height={500}
                          src={activeItem.image}
                          className={cn("rounded-lg  w-[500px] my-auto")}
                        >
                          <source src={activeItem.image} />
                        </video>
                      </div>
                    ) : (
                      <Image
                        src={activeItem.image || imgPlaceholder}
                        alt={activeItem.title}
                        height={500}
                        width={300}
                        className="object-cover h-full w-[300px] rounded-lg"
                      />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{activeItem.title}</h2>
                    <p className="text-gray-600">{activeItem.description}</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  Hover over an item to see preview
                </div>
              )}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
