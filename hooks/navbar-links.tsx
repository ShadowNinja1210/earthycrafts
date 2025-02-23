import { PreviewItem } from "@/lib/types";
import { useMemo } from "react";

export default function useCategoriesLinks() {
  const categories: PreviewItem[] = useMemo(
    () => [
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
    ],
    []
  );

  const primaryCategories = useMemo(() => categories.filter((item) => item.type === "Primary Category"), [categories]);
  const secondaryCategories = useMemo(
    () => categories.filter((item) => item.type === "Secondary Category"),
    [categories]
  );

  return { categories, primaryCategories, secondaryCategories };
}
