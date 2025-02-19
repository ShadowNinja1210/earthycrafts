"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { INewProduct } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../products/product-card";

export default function ProductCarousel2() {
  const { data: products } = useQuery<INewProduct[]>({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await fetch("/api/product/featured");
      const products = await res.json();
      return products.slice(0, 5);
    },
  });

  const settings = {
    dots: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 1,
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
    <div className="slider-container py-8 xl:px-16 lg:px-12 md:px-8 sm:px-6 px-4">
      <Slider {...settings}>
        {products?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Slider>
    </div>
  );
}
