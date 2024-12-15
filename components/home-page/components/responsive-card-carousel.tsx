"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/product-card";
import { IProduct } from "@/lib/schema";

interface ResponsiveCardCarouselProps {
  cards: IProduct[];
}

export default function ResponsiveCardCarousel({ cards }: ResponsiveCardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const totalCards = cards.length;
  const cardsToShow = isMobile ? 1 : 3;
  const maxIndex = totalCards - cardsToShow;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / (isMobile ? 1 : cardsToShow + 0.2);
      carouselRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }, [currentIndex, isMobile]);

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <div className="overflow-hidden">
        <div ref={carouselRef} className="flex transition-transform duration-300 ease-out" style={{ gap: "1rem" }}>
          {cards.map((card, index) => (
            <ProductCard
              key={card.id + index}
              product={card}
              className="flex-shrink-0"
              style={{ width: isMobile ? "100%" : `calc((100% - 3rem) / ${cardsToShow + 0.2})` }}
            />
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous cards</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
        disabled={currentIndex === maxIndex}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next cards</span>
      </Button>
    </div>
  );
}
