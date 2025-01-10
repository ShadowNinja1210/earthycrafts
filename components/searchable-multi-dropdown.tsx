"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface Item {
  value: string;
  label: string;
}

interface SearchableMultiDropdownProps {
  items: Item[];
  onSelect: (selectedItems: Item[]) => void;
  onAdd: (newItem: string) => void;
  placeholder?: string;
  selectedItems: Item[];
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const filteredItems = (items || []).filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (item: Item) => {
    const newSelectedItems = selectedItems.some((i) => i.value === item.value)
      ? selectedItems.filter((i) => i.value !== item.value)
      : [...selectedItems, item];
    onSelect(newSelectedItems);
  };

  const handleAdd = () => {
    if (search && !items.some((item) => item.label.toLowerCase() === search.toLowerCase())) {
      onAdd(search);
      setSearch("");
    }
  };

  const removeItem = (item: Item) => {
    onSelect(selectedItems?.filter((i) => i.value !== item.value));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedItems && selectedItems.length > 0 ? `${selectedItems.length} selected` : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" onPointerDownOutside={(e) => e.preventDefault()}>
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
            <Button variant="outline" size="sm" className="mt-2 w-full" onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add &quot;{search}&quot;
            </Button>
          </CommandEmpty>
          <CommandGroup>
            {filteredItems?.map((item) => (
              <CommandItem key={item.value} onSelect={() => handleSelect(item)}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedItems?.some((i) => i.value === item.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedItems &&
          selectedItems?.map((item) => (
            <Badge key={item.value} variant="secondary">
              {item.label}
              <Button variant="ghost" size="sm" className="ml-2 h-4 w-4 p-0" onClick={() => removeItem(item)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
      </div>
    </Popover>
  );
}
