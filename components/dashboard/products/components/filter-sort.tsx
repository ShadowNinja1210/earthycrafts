/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { INewProduct } from "@/lib/schema";
import { Filter } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { staticPrimaryCategories, staticSecondaryCategories } from "@/public/assets/some-data";
import useProductData from "@/hooks/use-products";
import { lowerCase } from "lodash";
import { Separator } from "@/components/ui/separator";

interface FilterSortProps {
  products: INewProduct[];
  onFilterSort: (filteredSortedProducts: INewProduct[]) => void;
}

export default function FilterSort({ products, onFilterSort }: FilterSortProps) {
  const [filters, setFilters] = useState<
    Partial<INewProduct> & {
      primaryCategories: string[];
      secondaryCategories: string[];
      subCategories: string[];
      inStock: boolean;
    }
  >({
    primaryCategories: [],
    secondaryCategories: [],
    subCategories: [],
    inStock: true,
  });
  const [sortOption, setSortOption] = useState<string>("");
  const [mergedSecondaryCategories, setMergedSecondaryCategories] = useState<string[]>([]);

  const { secondaryCategories, subCategories } = useProductData(products);

  useEffect(() => {
    applyFilterSort();
  }, [products, filters, sortOption]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const merged = [...new Set([...staticSecondaryCategories, ...secondaryCategories])];
    setMergedSecondaryCategories(merged);
  }, [secondaryCategories]);

  const handleFilterChange = (key: string, value: any) => {
    if (key === "primaryCategories" || key === "subCategories" || key === "secondaryCategories") {
      setFilters((prev) => ({
        ...prev,
        [key]: prev[key].includes(value) ? prev[key].filter((item) => item !== value) : [...prev[key], value],
      }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const applyFilterSort = useCallback(() => {
    let result = [...products];

    // Filter by primary category
    if (filters.primaryCategories.length > 0) {
      result = result.filter((product) =>
        filters.primaryCategories.some((category) =>
          product.primaryCategory.some((cat) => lowerCase(cat) === lowerCase(category))
        )
      );
    }

    // Filter by secondary category
    if (filters.secondaryCategories.length > 0) {
      result = result.filter((product) =>
        filters.secondaryCategories.some((category) =>
          product.secondaryCategory.some((cat) => lowerCase(cat) === lowerCase(category))
        )
      );
    }

    if (filters.subCategories.length > 0) {
      result = result.filter((product) => filters.subCategories.includes(product.subCategory as string));
    }

    if (filters.inStock !== undefined) {
      result = result.filter((product) => product.inStock === filters.inStock);
    }

    if (sortOption) {
      const [key, order] = sortOption.split(":");
      result.sort((a, b) => {
        if (a[key as keyof INewProduct] < b[key as keyof INewProduct]) return order === "asc" ? -1 : 1;
        if (a[key as keyof INewProduct] > b[key as keyof INewProduct]) return order === "asc" ? 1 : -1;
        return 0;
      });
    }

    onFilterSort(result);
  }, [products, filters, sortOption, onFilterSort]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="font-semibold">
          <Filter className="mr-2 h-4 w-4" />
          Filter & Sort
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64">
        <ScrollArea className="h-[80vh]">
          <div className="p-4 space-y-4">
            {/* Categories */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Categories</h3>
              <div className="space-y-1">
                {staticPrimaryCategories.map((category) => (
                  <div key={category} className="flex items-center capitalize">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.primaryCategories.includes(category)}
                      onCheckedChange={() => handleFilterChange("primaryCategories", category)}
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm">
                      {category}
                    </label>
                  </div>
                ))}

                <Separator className="my-4" />

                {mergedSecondaryCategories.map((category) => (
                  <div key={category} className="flex items-center capitalize">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.secondaryCategories.includes(category)}
                      onCheckedChange={() => handleFilterChange("secondaryCategories", category)}
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Subcategories */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Sub-Categories</h3>
              <div className="space-y-1">
                {subCategories.sort().map((subCategory) => (
                  <div key={subCategory} className="flex items-center capitalize">
                    <Checkbox
                      id={`subCategory-${subCategory}`}
                      checked={filters.subCategories.includes(subCategory as string)}
                      onCheckedChange={() => handleFilterChange("subCategories", subCategory)}
                    />
                    <label htmlFor={`subCategory-${subCategory}`} className="ml-2 text-sm">
                      {subCategory}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* In-Stock */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Availability</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={filters.inStock === true}
                  onCheckedChange={() => handleFilterChange("inStock", filters.inStock === true ? undefined : true)}
                />
                <label htmlFor="inStock" className="text-sm">
                  In Stock Only
                </label>
              </div>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Sort By</h3>
              <Select onValueChange={handleSortChange} value={sortOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sorting option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name:asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name:desc">Name (Z-A)</SelectItem>
                  <SelectItem value="createdAt:asc">Date Added (Oldest First)</SelectItem>
                  <SelectItem value="createdAt:desc">Date Added (Newest First)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Apply Button */}
            <Button className="w-full mt-4" onClick={applyFilterSort}>
              Apply Filters & Sort
            </Button>
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
