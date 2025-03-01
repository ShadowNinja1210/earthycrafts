import SpinLoader from "@/components/loaders/spin-loader";
import ProductsLayout from "@/components/products/products-layout";
import { INewProduct } from "@/lib/schema";
import { lowerCase } from "lodash";
import { Suspense } from "react";

export default async function AllProductsPage() {
  let products: INewProduct[] = [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`);
    products = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // Create category mapping
  const categoryMap = new Map<string, { subCategories: Set<string>; type: string }>();
  products.forEach((product) => {
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

  // Convert Map to Array
  const categories = Array.from(categoryMap, ([name, { subCategories, type }]) => ({
    name,
    subCategories: Array.from(subCategories),
    type, // Either "primary" or "secondary"
  }));

  return (
    <Suspense fallback={<SpinLoader size="xl" />}>
      <ProductsLayout categories={categories} products={products} />;
    </Suspense>
  );
}
