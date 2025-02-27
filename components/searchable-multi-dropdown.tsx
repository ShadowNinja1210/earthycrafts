"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { kebabCase } from "lodash";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface SearchableMultiDropdownProps {
  items: string[];
  onSelect: (selectedItems: string[]) => void;
  onAdd: (newItem: string) => void;
  placeholder?: string;
  selectedItems: string[];
}

export function SearchableMultiDropdown({
  items,
  onSelect,
  onAdd,
  placeholder = "Search items...",
  selectedItems,
}: SearchableMultiDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredItems = (items || []).filter((item) => item.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (item: string) => {
    const newSelectedItems = selectedItems.some((i) => kebabCase(i) === kebabCase(item))
      ? selectedItems.filter((i) => kebabCase(i) !== kebabCase(item))
      : [...selectedItems, item];
    onSelect(newSelectedItems);
  };

  const handleAdd = () => {
    if (search && !items.some((item) => kebabCase(item.toLowerCase()) === kebabCase(search.toLowerCase()))) {
      onAdd(search);
      setSearch("");
    }
  };

  const removeItem = (item: string) => {
    onSelect(selectedItems?.filter((i) => i !== item));
  };

  return (
    <>
      <Collapsible className="w-full">
        <CollapsibleTrigger className=" capitalize" asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedItems && selectedItems.length > 0 ? `${selectedItems.length} selected` : `Search ${placeholder}`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Command>
            <CommandInput
              placeholder={placeholder}
              value={search}
              onValueChange={setSearch}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  setOpen(false);
                }
              }}
            />
            <CommandEmpty>
              No item found.
              <Button variant="outline" type="button" size="sm" className="mt-2 w-full" onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" />
                Add &quot;{search}&quot;
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {filteredItems?.map((item) => (
                <CommandItem className=" capitalize" key={item} onSelect={() => handleSelect(item)}>
                  <Check
                    className={cn("mr-2 h-4 w-4", selectedItems?.some((i) => i === item) ? "opacity-100" : "opacity-0")}
                  />
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex flex-wrap gap-2 mt-2">
        {selectedItems &&
          selectedItems?.map((item) => (
            <Badge className=" capitalize" key={item} variant="secondary">
              {item}
              <Button variant="ghost" size="sm" className="ml-2 h-4 w-4 p-0" onClick={() => removeItem(item)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
      </div>
    </>
  );
}
