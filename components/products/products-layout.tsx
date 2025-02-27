"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { INewProduct } from "@/lib/schema";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import ProductCard from "./product-card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { cn } from "@/lib/utils";
import { kebabCase, lowerCase } from "lodash";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";

export type ICategory = {
  name: string;
  subCategories: string[];
  type: string;
};

interface ProductsLayoutProps {
  categories: ICategory[];
  products: INewProduct[];
}

// Separate component to handle search params
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FilterParams({ setSelectedCategory, setSelectedSubCategory }: any) {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlSubCategory = searchParams.get("subCategory");

  useEffect(() => {
    if (urlCategory) setSelectedCategory(urlCategory);
    if (urlSubCategory) setSelectedSubCategory(urlSubCategory);
  }, [urlCategory, urlSubCategory, setSelectedCategory, setSelectedSubCategory]);

  return null;
}

export default function ProductsLayout({ categories, products }: ProductsLayoutProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [open, setOpen] = useState(true);

  console.log(categories);

  const filteredProducts = products.filter((product) => {
    const normalizedCategory = kebabCase(selectedCategory || "");
    const normalizedSubCategory = kebabCase(selectedSubCategory || "");

    if (normalizedSubCategory) {
      // If subCategory is selected, filter by both subCategory and primaryCategory
      return (
        kebabCase(product.subCategory || "") === normalizedSubCategory &&
        product.primaryCategory.some((cat) => kebabCase(cat) === normalizedCategory)
      );
    }

    // If only primary category is selected, filter normally
    return (
      !selectedCategory ||
      product.primaryCategory.some((cat) => kebabCase(cat) === normalizedCategory) ||
      product.secondaryCategory.some((cat) => kebabCase(cat) === normalizedCategory)
    );
  });

  return (
    <main>
      <Suspense fallback={<div>Loading filters...</div>}>
        <FilterParams setSelectedCategory={setSelectedCategory} setSelectedSubCategory={setSelectedSubCategory} />
      </Suspense>
      <SidebarProvider open={open} onOpenChange={setOpen} className=" bg-sidebar-primary-foreground">
        <Sidebar className=" inset-y-[71px]   z-10">
          <SidebarHeader>
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedCategory("");
                setSelectedSubCategory("");
              }}
              className="text-2xl font-semibold"
            >
              All Products
            </Button>
            <Separator className="border-t " />
          </SidebarHeader>
          <SidebarContent className="">
            <SidebarMenu className=" ">
              {categories.sort().map(
                (category) =>
                  category.type === "primary" && (
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
                            className={cn(
                              "p-4 justify-between capitalize",
                              selectedCategory === category.name ? "bg-accent" : ""
                            )}
                          >
                            {lowerCase(category.name)}
                            {/* {category.name} */}
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
                                    setSelectedSubCategory(subCategory);
                                  }}
                                >
                                  <Link
                                    href={`/products?subCategory=${kebabCase(subCategory)}`}
                                    className=" capitalize"
                                  >
                                    {lowerCase(subCategory)}
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
              )}
              {categories.map(
                (category) =>
                  category.subCategories.length === 0 && (
                    <SidebarMenuItem key={category.name}>
                      <SidebarMenuButton
                        className={cn("p-4", selectedCategory === category.name ? "bg-accent" : "")}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setSelectedSubCategory("");
                        }}
                      >
                        <Link href={`/products?category=${kebabCase(category.name)}`} className=" capitalize">
                          {category.name === "tukdi art"
                            ? "Artisan Stone Mosaic"
                            : category.name === "bali marble" ||
                              category.name === "bali stone" ||
                              category.name === "bali"
                            ? "Bali Stone"
                            : lowerCase(category.name)}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
              )}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 p-6">
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <SidebarTrigger />
            <Link href="/" className="flex items-center gap-1 hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Products</span>
            {selectedCategory && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground capitalize">{lowerCase(selectedCategory)}</span>
              </>
            )}
            {selectedSubCategory && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground capitalize">{lowerCase(selectedSubCategory)}</span>
              </>
            )}
          </div>

          <div className="grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            <Suspense fallback={<div>Loading...</div>}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Suspense>
          </div>
        </div>
      </SidebarProvider>
    </main>
  );
}
