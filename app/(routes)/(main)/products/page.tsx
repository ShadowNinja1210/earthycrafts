import ProductsLayout from "@/components/products/products-layout";
import { INewProduct } from "@/lib/schema";
import { lowerCase } from "lodash";

export default async function AllProductsPage() {
  let products: INewProduct[] = [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product`);
    products = await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // Create category mapping
  const categoryMap = new Map<string, Set<string>>();

  products.forEach((product) => {
    const { primaryCategory, subCategory, secondaryCategory } = product;

    // Handle primary categories
    primaryCategory?.forEach((category) => {
      category = lowerCase(category.trim());

      if (!categoryMap.has(category)) {
        categoryMap.set(category, new Set());
      }
      if (subCategory) {
        categoryMap.get(category)?.add(subCategory);
      }
    });

    // Handle secondary categories
    secondaryCategory?.forEach((category) => {
      category = lowerCase(category.trim());

      if (!categoryMap.has(category)) {
        categoryMap.set(category, new Set());
      }
    });
  });

  // Convert Map to Array
  const categories = Array.from(categoryMap, ([name, subCategoriesSet]) => ({
    name,
    subCategories: Array.from(subCategoriesSet),
  }));

  return <ProductsLayout categories={categories} products={products} />;
}
