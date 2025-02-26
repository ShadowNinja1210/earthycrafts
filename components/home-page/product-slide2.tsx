"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { INewProduct } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../products/product-card";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useRef } from "react";

export default function ProductCarousel2() {
  const { data: products, isLoading } = useQuery<INewProduct[]>({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await fetch("/api/product/featured");
      const products = await res.json();

      return products.slice(0, 5);
    },
  });

  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  console.log("Products outside the fetch", products);

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1480,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container py-8 xl:px-16 lg:px-12 md:px-8 sm:px-6 px-4 overflow-hidden relative">
      <h1 className="md:text-4xl text-3xl font-bold text-center mb-12">Which product is appealing your pallet?</h1>

      <Button
        size="icon"
        className=" rounded-full absolute w-12 h-12 z-50 top-1/2 -translate-y-4 xl:left-12 lg:left-8 md:left-4 sm:left-2 left-0 text-black bg-white hover:text-black hover:bg-neutral-100"
        onClick={previous}
      >
        <ArrowLeftCircle className="w-12 h-12" size={28} />
      </Button>

      <Button
        size="icon"
        className=" rounded-full absolute w-12 h-12 z-50 top-1/2 -translate-y-4 xl:right-12 lg:right-8 md:right-4 sm:right-2 right-0 text-black bg-white hover:text-black hover:bg-neutral-100"
        onClick={next}
      >
        <ArrowRightCircle className="w-12 h-12" size={28} />
      </Button>

      <Slider
        ref={(slider) => {
          sliderRef.current = slider;
        }}
        {...settings}
      >
        {isLoading
          ? [1, 2, 3, 4, 5].map((index) => <Skeleton key={index} className="w-80 h-[480px]" />)
          : products?.map((product, index) => <ProductCard key={index} product={product} />)}
      </Slider>
    </div>
  );
}
