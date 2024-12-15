import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { useEffect, useMemo, useState } from "react";
import TooltipContext from "../contexts/tooltip-context";

import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/lib/api";
import useProductData from "@/hooks/use-products";
import { IProduct } from "@/lib/schema";
import _ from "lodash";
import SearchCards from "./search-cards";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const {
    data: products,
    error: productError,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  useEffect(() => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    const results = products.filter((product: IProduct) => {
      return (
        _.kebabCase(product.name).includes(_.kebabCase(query)) ||
        _.kebabCase(product.stoneName).includes(_.kebabCase(query)) ||
        _.kebabCase(product.subCategory).includes(_.kebabCase(query)) ||
        _.kebabCase(product.category).includes(_.kebabCase(query)) ||
        product.tags.some((tag) => _.kebabCase(tag).includes(_.kebabCase(query)))
      );
    });

    setSearchResults(results);
  }, [query, products]);

  return (
    <Dialog>
      <TooltipContext context="Search products">
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search />
          </Button>
        </DialogTrigger>
      </TooltipContext>
      <DialogContent className="flex flex-col h-[80vh]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-center">Search Products</DialogTitle>
          <Input disabled={isLoading} placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
          <DialogDescription>
            {isLoading ? "Getting products..." : `Search results for ${query && "${query}"}`}
          </DialogDescription>
        </DialogHeader>

        <div className="px-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {searchResults.map((product: IProduct) => (
              <SearchCards key={product.productCode} product={product} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
