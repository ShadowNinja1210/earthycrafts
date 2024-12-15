"use client";

// import ResponsiveCardCarousel from "@/components/home-page/components/responsive-card-carousel";

// export default function ProductSlide() {
//

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 ">
//       {isLoading ? <p>Loading...</p> : <ResponsiveCardCarousel cards={featuredProducts} />}
//     </main>
//   );
// }

import { fetchFeaturedProducts } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import ProductCard from "../product-card";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

export default function BasicDemo() {
  const [products, setProducts] = useState<Product[]>([]);

  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: fetchFeaturedProducts,
  });

  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  return (
    <div className="card">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Carousel
          value={featuredProducts}
          numVisible={3}
          numScroll={3}
          responsiveOptions={responsiveOptions}
          itemTemplate={ProductCard}
        />
      )}
    </div>
  );
}
