"use client";

import SpinLoader from "@/components/loaders/spin-loader";
import ProductsLayout from "@/components/products/products-layout";
import { fetchAllProducts } from "@/lib/api";
import { INewProduct } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import { lowerCase } from "lodash";
import { Suspense } from "react";

export default function AllProductsPage() {
  const { data: products, isLoading } = useQuery<INewProduct[]>({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  // Create category mapping
  const categoryMap = new Map<string, { subCategories: Set<string>; type: string }>();

  if (!isLoading) {
    products?.forEach((product) => {
      const { primaryCategory, subCategory, secondaryCategory } = product;

      // Handle primary categories
      primaryCategory?.forEach((category) => {
        const normalizedCategory = lowerCase(category.trim());

        if (!categoryMap.has(normalizedCategory)) {
          categoryMap.set(normalizedCategory, {
            subCategories: new Set(),
            type: secondaryCategory?.includes(category) ? "secondary" : "primary",
          });
        }

        // Add subCategory if it exists
        if (subCategory) {
          categoryMap.get(normalizedCategory)?.subCategories.add(lowerCase(subCategory.trim()));
        }
      });

      // Handle secondary categories
      secondaryCategory?.forEach((category) => {
        const normalizedCategory = lowerCase(category.trim());

        if (!categoryMap.has(normalizedCategory)) {
          categoryMap.set(normalizedCategory, { subCategories: new Set(), type: "secondary" });
        }
      });
    });
  }

  // Convert Map to Array
  const categories = Array.from(categoryMap, ([name, { subCategories, type }]) => ({
    name,
    subCategories: Array.from(subCategories),
    type, // Either "primary" or "secondary"
  }));

  return (
    <Suspense fallback={isLoading && <SpinLoader size="xl" />}>
      {isLoading ? (
        <SpinLoader size="xl" />
      ) : (
        <ProductsLayout categories={categories} products={products as INewProduct[]} />
      )}
    </Suspense>
  );
}
