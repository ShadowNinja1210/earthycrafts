"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { IProduct } from "@/lib/schema";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
} from "@/components/ui/sidebar";
import ProductCard from "./product-card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { cn } from "@/lib/utils";
import _ from "lodash";

export type ICategory = {
  name: string;
  subCategories: string[];
};

interface ProductsLayoutProps {
  categories: ICategory[];
  products: IProduct[];
}

export default function ProductsLayout({ categories, products }: ProductsLayoutProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  const filteredProducts = products.filter(
    (product) =>
      (!selectedCategory || product.category === selectedCategory) &&
      (!selectedSubCategory || product.subCategory === selectedSubCategory)
  );

  return (
    <main>
      <SidebarProvider>
        <Sidebar className="inset-y-16">
          <SidebarContent>
            <SidebarMenu>
              {categories.map((category) => (
                <Collapsible
                  className="group/collapsible"
                  defaultOpen={false}
                  key={category.name}
                  title={category.name}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setSelectedSubCategory("");
                        }}
                        className={cn("p-4 justify-between", selectedCategory === category.name ? "bg-accent" : "")}
                      >
                        {category.name}{" "}
                        <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="space-y-1">
                        {category.subCategories.map((subCategory: string) => (
                          <SidebarMenuItem key={subCategory}>
                            <SidebarMenuButton
                              className={cn("", selectedSubCategory === subCategory ? "bg-accent" : "")}
                              onClick={() => {
                                setSelectedCategory(category.name);
                                setSelectedSubCategory(subCategory);
                              }}
                            >
                              <Link
                                href={`/products?category=${_.kebabCase(category.name)}&subCategory=${_.kebabCase(
                                  subCategory
                                )}`}
                              >
                                {subCategory}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 p-6">
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="flex items-center gap-1 hover:text-foreground">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Products</span>
            {selectedCategory && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">{selectedCategory}</span>
              </>
            )}
            {selectedSubCategory && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">{selectedSubCategory}</span>
              </>
            )}
          </div>

          <div className="grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </SidebarProvider>
    </main>
  );
}
