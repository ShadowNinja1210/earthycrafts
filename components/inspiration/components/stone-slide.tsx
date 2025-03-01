"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { useRef } from "react";
import { stonesLink } from "@/public/assets/some-data";
import { StoneCard } from "../stones-page";

export default function StoneSlide() {
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
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
          slidesToShow: 3,
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
    <div className="slider-container xl:px-16 lg:px-12 md:px-8 sm:px-6 px-4 overflow-hidden relative">
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
        {stonesLink.map((stone, index) => (
          <StoneCard stone={stone} key={index} />
        ))}
      </Slider>
    </div>
  );
}
