"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";

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
    id: 4,
    title: "Design your home",
    description: "Handmade with love, each piece is as unique as its origin.",
    image: "/videos/categories/home.mp4",
    type: "Primary Category",
    link: "/products?category=home",
  },
  {
    id: 5,
    title: "Outdoor Spaces",
    description: "Productive workspace with ergonomic design",
    image: "/videos/categories/outdoor.mp4",
    type: "Primary Category",
    link: "/products?category=outdoor",
  },
  {
    id: 6,
    title: "Garden & Landscape",
    description: "Spa-like bathroom with premium fixtures and finishes",
    image: "/videos/categories/garden-landscape.mp4",
    type: "Primary Category",
    link: "/products?category=garden",
  },
  {
    id: 7,
    title: "Agra Red",
    description: "Productive workspace with ergonomic design",
    image: "/images/sub-categories/agra-red.jpg",
    type: "Secondary Category",
    link: "/products?category=agra-red",
  },
  {
    id: 8,
    title: "Beslana",
    description: "Comfortable outdoor seating area with modern furniture",
    image: "/images/sub-categories/beslana.jpg",
    type: "Secondary Category",
    link: "/products?category=beslana",
  },
  {
    id: 9,
    title: "Sandstone",
    description: "Elegant dining space with a large table and stylish chairs",
    image: "/videos/sub-categories/sandstone.mp4",
    type: "Secondary Category",
    link: "/products?category=sandstone",
  },
  {
    id: 10,
    title: "Bali",
    description: "Fun and colorful room designed for children",
    image: "/videos/sub-categories/bali.mp4",
    type: "Secondary Category",
    link: "/products?category=bali",
  },
  {
    id: 11,
    title: "Blue Pottery",
    description: "Cozy and welcoming guest bedroom",
    image: "/images/sub-categories/blue-pottery.jpg",
    type: "Secondary Category",
    link: "/products?category=blue-pottery",
  },
  {
    id: 12,
    title: "Tukdi Art",
    description: "Efficient laundry space with modern appliances",
    image: "/images/sub-categories/tukdi.jpg",
    type: "Secondary Category",
    link: "/products?category=tukdi-art",
  },
  {
    id: 13,
    title: "Temple",
    description: "Organized garage with storage solutions",
    image: "/images/sub-categories/temple.jpg",
    type: "Secondary Category",
    link: "/products?category=temple",
  },
  {
    id: 14,
    title: "White Marble",
    description: "Quiet home library with built-in bookshelves",
    image: "/images/sub-categories/white-marble.jpg",
    type: "Secondary Category",
    link: "/products?category=white-marble",
  },
  {
    id: 15,
    title: "Funiture",
    description: "Home gym with various exercise equipment",
    image: "/videos/sub-categories/furniture.mp4",
    type: "Secondary Category",
    link: "/products?category=furniture",
  },
  {
    id: 16,
    title: "Handicrafts",
    description: "Temperature-controlled wine storage room",
    image: "",
    type: "Secondary Category",
    link: "/products?category=handicrafts",
  },
];

export default function Explore() {
  const [primaryCategoryItems, setPrimaryCategoryItems] = useState<PreviewItem[]>([]);
  const [secondaryCategoryItems, setSecondaryCategoryItems] = useState<PreviewItem[]>([]);

  useEffect(() => {
    const primaryCategories = previewItems.filter((item) => item.type === "Primary Category");
    setPrimaryCategoryItems(primaryCategories);
    const secondaryCategories = previewItems.filter((item) => item.type === "Secondary Category");
    setSecondaryCategoryItems(secondaryCategories);
  }, []);

  return (
    <div className="grid gap-6 p-6 md:w-[800px] lg:w-[900px]">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Primary Categories</h3>
          <Button variant="link" size="sm">
            View all
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {primaryCategoryItems.map((category) => (
            <NavigationMenuLink asChild key={category.title}>
              <a
                className="group grid h-full w-full items-center justify-start gap-4 rounded-md border p-4 hover:bg-muted"
                href="#"
              >
                <div className="flex aspect-square w-32 items-center justify-center rounded-md border bg-muted">
                  <video className="aspect-square rounded-md object-cover" height={120} width={120} autoPlay loop muted>
                    <source src={category.image} type="video/mp4" />
                  </video>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm font-medium leading-none group-hover:underline">{category.title}</div>
                  <div className="line-clamp-2 text-sm text-muted-foreground">{category.description}</div>
                </div>
              </a>
            </NavigationMenuLink>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Secondary Categories</h3>
          <Button variant="link" size="sm">
            View all
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {secondaryCategoryItems.map((category) => (
            <NavigationMenuLink asChild key={category.title}>
              <Link
                className="group flex flex-col items-center gap-2 rounded-md p-2 hover:bg-muted"
                href={category.link}
              >
                <div className="flex aspect-square w-16 items-center justify-center rounded-md border bg-muted">
                  {category.image.includes(".mp4") ? (
                    <video className="aspect-square rounded-md object-cover" height={80} width={80} autoPlay loop muted>
                      <source src={category.image} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      alt={category.title}
                      className="aspect-square rounded-md object-cover"
                      height={80}
                      src={category.image || "/placeholder.svg"}
                      width={80}
                    />
                  )}
                </div>
                <span className="text-sm font-medium capitalize group-hover:underline">{category.title}</span>
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      </div>
    </div>
  );
}
