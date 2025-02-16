"use client";

import { useState } from "react";
import Image from "next/image";
import { INewProduct } from "@/lib/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { imgPlaceholder } from "@/public/assets/some-data";
import BreadcrumbsContext from "../breadcrumbs-context";

export default function ProductDetails({ product }: { product: INewProduct }) {
  const [selectedImage, setSelectedImage] = useState(
    product.images.find((img) => img.main)?.image || product.images[0]?.image
  );

  const crumbs = ["Home", "Products", product.name];

  const featurePoints = [
    {
      key: "Handcrafted Excellence",
      point: "Each product is meticulously crafted by skilled artisans, ensuring a unique and high-quality finish.",
    },
    {
      key: "Premium Materials",
      point: "Made using top-grade materials to guarantee durability and lasting beauty.",
    },
    {
      key: "Artistic Design",
      point: "Features timeless designs that blend traditional craftsmanship with contemporary aesthetics.",
    },
    {
      key: "Versatile Utility",
      point: "Suitable for both everyday use and special occasions, offering style and functionality.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-4 md:w-fit w-full">
      <BreadcrumbsContext items={crumbs} className="px-4" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image src={selectedImage || imgPlaceholder} alt={product.name} fill className="object-cover" />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img.image)}
                className={`relative w-20 h-20 rounded-md overflow-hidden ${
                  selectedImage === img.image ? "brightness-50" : ""
                }`}
              >
                <Image
                  src={img.image || imgPlaceholder}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="font-semibold">Product Code</h2>
                <p>{product.productCode}</p>
              </div>
              <div>
                <h2 className="font-semibold">Stone Name</h2>
                <p>{product.stoneName}</p>
              </div>
              <div>
                <h2 className="font-semibold">Primary Category</h2>
                <p>
                  {product.primaryCategory.map((category, index) => (
                    <span key={category}>
                      {category} {index < product.primaryCategory.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Secondary Category</h2>
                <p>
                  {product.secondaryCategory.map((category, index) => (
                    <span key={category}>
                      {category} {index < product.secondaryCategory.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Subcategory</h2>
                <p>{product.subCategory}</p>
              </div>
            </div>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc pl-5 space-y-1">
                {featurePoints.map((item, index) => (
                  <li key={index}>
                    <span className="font-bold">{item.key}</span>: {item.point}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
