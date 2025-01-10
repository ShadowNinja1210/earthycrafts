"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { IProduct } from "@/lib/schema";
import { Filter } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilterSortProps {
  products: IProduct[];
  onFilterSort: (filteredSortedProducts: IProduct[]) => void;
}

export default function FilterSort({ products, onFilterSort }: FilterSortProps) {
  const [filters, setFilters] = useState<Partial<IProduct> & { categories: string[]; subCategories: string[] }>({
    categories: [],
    subCategories: [],
    inStock: undefined,
  });
  const [sortOption, setSortOption] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: string, value: any) => {
    if (key === "categories" || key === "subCategories") {
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

  const applyFilterSort = () => {
    let result = [...products];

    if (filters.categories.length > 0) {
      result = result.filter((product) => filters.categories.includes(product.category));
    }

    if (filters.subCategories.length > 0) {
      result = result.filter((product) => filters.subCategories.includes(product.subCategory));
    }

    if (filters.inStock !== undefined) {
      result = result.filter((product) => product.inStock === filters.inStock);
    }

    if (sortOption) {
      const [key, order] = sortOption.split(":");
      result.sort((a, b) => {
        if (a[key as keyof IProduct] < b[key as keyof IProduct]) return order === "asc" ? -1 : 1;
        if (a[key as keyof IProduct] > b[key as keyof IProduct]) return order === "asc" ? 1 : -1;
        return 0;
      });
    }

    onFilterSort(result);
  };

  const categories = Array.from(new Set(products?.map((p) => p.category)));
  const subCategories = Array.from(new Set(products?.map((p) => p.subCategory)));

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
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => handleFilterChange("categories", category)}
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Sub-Categories</h3>
              <div className="space-y-1">
                {subCategories.map((subCategory) => (
                  <div key={subCategory} className="flex items-center">
                    <Checkbox
                      id={`subCategory-${subCategory}`}
                      checked={filters.subCategories.includes(subCategory)}
                      onCheckedChange={() => handleFilterChange("subCategories", subCategory)}
                    />
                    <label htmlFor={`subCategory-${subCategory}`} className="ml-2 text-sm">
                      {subCategory}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">In Stock</h3>
              <Select
                onValueChange={(value) =>
                  handleFilterChange("inStock", value === "true" ? true : value === "false" ? false : undefined)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Sort</h3>
              <Select onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sorting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="name:asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name:desc">Name (Z-A)</SelectItem>
                  <SelectItem value="createdAt:asc">Date Created (Oldest First)</SelectItem>
                  <SelectItem value="createdAt:desc">Date Created (Newest First)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full" onClick={applyFilterSort}>
              Apply
            </Button>
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
