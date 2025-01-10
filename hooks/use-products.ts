import { IProduct } from "@/lib/schema";
import { useMemo } from "react";

export default function useProductData(products: IProduct[]) {
  const getCategories = useMemo(() => {
    return () => {
      if (!products) return [];
      const uniqueCategories = products.reduce<string[]>((acc, product) => {
        if (!acc.includes(product.category)) {
          acc.push(product.category);
        }
        return acc;
      }, []);
      return uniqueCategories;
    };
  }, [products]);

  const getSubCategories = useMemo(() => {
    return () => {
      if (!products) return [];
      const uniqueSubCategories = products.reduce<string[]>((acc, product) => {
        if (!acc.includes(product.subCategory)) {
          acc.push(product.subCategory);
        }
        return acc;
      }, []);
      return uniqueSubCategories;
    };
  }, [products]);

  const getStoneNames = useMemo(() => {
    return () => {
      if (!products) return [];
      const uniqueStoneNames = products.reduce<string[]>((acc, product) => {
        if (!acc.includes(product.stoneName)) {
          acc.push(product.stoneName);
        }
        return acc;
      }, []);
      return uniqueStoneNames;
    };
  }, [products]);

  return {
    getCategories,
    getSubCategories,
    getStoneNames,
  };
}
