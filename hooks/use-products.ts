import { INewProduct } from "@/lib/schema";
import { useMemo } from "react";

export default function useProductData(products: INewProduct[]) {
  const { primaryCategories, secondaryCategories, subCategories, stoneNames } = useMemo(() => {
    if (!products || products.length === 0) {
      return {
        primaryCategories: [],
        secondaryCategories: [],
        subCategories: [],
        stoneNames: [],
      };
    }

    // Use `Set` to ensure unique values
    const primaryCategoriesSet = new Set<string>();
    const secondaryCategoriesSet = new Set<string>();
    const subCategoriesSet = new Set<string>();
    const stoneNamesSet = new Set<string>();

    products.forEach((product) => {
      // Add primary categories (array of strings)
      product.primaryCategory?.forEach((category) => {
        primaryCategoriesSet.add(category);
      });

      // Add secondary categories (array of strings)
      product.secondaryCategory?.forEach((category) => {
        secondaryCategoriesSet.add(category);
      });

      // Add subcategories (optional, string)
      if (product.subCategory) {
        subCategoriesSet.add(product.subCategory);
      }

      // Add stone names (array of strings)
      stoneNamesSet.add(product.stoneName);
    });

    return {
      primaryCategories: Array.from(primaryCategoriesSet),
      secondaryCategories: Array.from(secondaryCategoriesSet),
      subCategories: Array.from(subCategoriesSet),
      stoneNames: Array.from(stoneNamesSet),
    };
  }, [products]);

  return {
    primaryCategories,
    secondaryCategories,
    subCategories,
    stoneNames,
  };
}
