"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { INewProduct } from "@/lib/schema";
import ProductCard from "../products/product-card";

export default function ProductCarousel() {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { data: products } = useQuery<INewProduct[]>({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await fetch("/api/product/featured");
      const products = await res.json();
      return products.slice(0, 5);
    },
  });
  const checkScroll = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [carouselRef]); // Added carouselRef to dependencies

  const scroll = (direction: "left" | "right") => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollAmount = direction === "left" ? -carousel.clientWidth : carousel.clientWidth;
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Which product is appealing your pallet?</h1>

      <div className="relative">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products?.map((product) => (
            <ProductCard key={product.productCode} product={product} />
          ))}
        </div>

        {showLeft && (
          <Button
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-[-20px] top-1/2 -translate-y-1/2",
              "h-12 w-12 rounded-full bg-white shadow-lg",
              "flex items-center justify-center border border-gray-200"
            )}
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </Button>
        )}

        {showRight && (
          <Button
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-[-20px] top-1/2 -translate-y-1/2",
              "h-12 w-12 rounded-full bg-white shadow-lg",
              "flex items-center justify-center border border-gray-200"
            )}
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </Button>
        )}
      </div>
    </div>
  );
}
