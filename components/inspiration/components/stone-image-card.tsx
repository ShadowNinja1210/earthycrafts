"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
// import Slider from "react-slick";
import { imgPlaceholder } from "@/public/assets/some-data";

interface StoneImage {
  url: string;
  main: boolean;
}

interface StoneImageCarouselProps {
  images: StoneImage[];
  stoneName: string;
}

export default function StoneImageCarousel({ images, stoneName }: StoneImageCarouselProps) {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  return (
    <div className="relative">
      <div className="relative h-[520px]">
        <Image
          src={images[0].url || imgPlaceholder}
          alt={`${stoneName} - Image`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      {/* <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="relative h-[520px]">
            <Image
              src={img.url || imgPlaceholder}
              alt={`${stoneName} - Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </Slider> */}
    </div>
  );
}
