"use client";

import ProductCard from "@/components/products/product-card";
import { IProduct } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useRef, useState } from "react";

export default function ProductSlide() {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const { data: products } = useQuery<IProduct[]>({
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

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({ left: -300, behavior: "smooth" });
      setTimeout(checkScroll, 300); // Delay to ensure accurate scroll position
    }
  };

  const scrollRight = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({ left: 300, behavior: "smooth" });
      setTimeout(checkScroll, 300); // Delay to ensure accurate scroll position
    }
  };

  return (
    <div className="container relative">
      <div ref={carouselRef} className="carousel w-full gap-8  ">
        {products &&
          products.map((product, index) => (
            <div className={cn("carousel-item")} key={product._id.toString()}>
              <ProductCard
                className={cn(index === 0 ? "ml-16" : index === products.length - 1 ? "mr-16" : "")}
                product={product}
              />
            </div>
          ))}

        {showLeft && (
          <Button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 text-neutral-800 hover:bg-white/50 text-xl h-16 w-16 rounded-full backdrop-blur-sm border border-white/20 shadow-lg"
          >
            &#60;
          </Button>
        )}
        {showRight && (
          <Button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 text-neutral-800 hover:bg-white/50 text-xl h-16 w-16 rounded-full backdrop-blur-md border border-white/20 shadow-lg"
          >
            &#62;
          </Button>
        )}
      </div>
    </div>
  );
}
