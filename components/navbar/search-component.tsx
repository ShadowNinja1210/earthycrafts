import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import TooltipContext from "../contexts/tooltip-context";

import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/lib/api";
import { IProduct } from "@/lib/schema";
import _ from "lodash";
import SearchCards from "./search-cards";

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  useEffect(() => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    console.log("Searching products for ", query);

    const results = products.filter((product: IProduct) => {
      return (
        _.lowerCase(_.camelCase(product.productCode)).includes(_.lowerCase(_.camelCase(query))) ||
        _.kebabCase(product.name).includes(_.kebabCase(query)) ||
        _.kebabCase(product.stoneName).includes(_.kebabCase(query)) ||
        _.kebabCase(product.subCategory).includes(_.kebabCase(query)) ||
        _.kebabCase(product.category).includes(_.kebabCase(query)) ||
        product.tags.some((tag) => _.kebabCase(tag).includes(_.kebabCase(query)))
      );
    });

    setSearchResults(results);
  }, [query, products]);

  const onclose = () => {
    setQuery("");
    setSearchResults([]);
  };

  return (
    <Dialog onOpenChange={onclose}>
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
          <Input disabled={isLoading} value={query} placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
          <DialogDescription>{`Searched results for ${query && query}`}</DialogDescription>
        </DialogHeader>

        <div className="px-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {query.length > 2 ? (
              isLoading ? (
                // Loading state
                <p className="text-center col-span-2">Searching products</p>
              ) : searchResults.length === 0 ? (
                // No results found
                <p className="text-center col-span-2">No results found</p>
              ) : (
                // Display search results
                searchResults.map((product: IProduct) => <SearchCards key={product.productCode} product={product} />)
              )
            ) : (
              // Search query is less than 3 characters
              <p className="text-center text-muted-foreground text-sm col-span-2">
                Enter 3 or more characters to search
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
