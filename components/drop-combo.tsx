"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchableDropdownProps {
  items: string[];
  onSelect: (item: string) => void;
  onAdd: (newItem: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

export function DropCombo({
  items = [],
  onSelect,
  onAdd,
  placeholder = "Search items...",
  defaultValue,
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const filteredItems: string[] = useMemo(() => {
    return items?.filter((item) => item.toLowerCase().includes(search.toLowerCase())) ?? [];
  }, [items, search]);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
    const selectedItem = items?.find((item) => item === currentValue);
    if (selectedItem) {
      onSelect(selectedItem);
    }
  };

  const handleAdd = () => {
    if (search && !items?.some((item) => item.toLowerCase() === search.toLowerCase())) {
      onAdd(search);
      setValue(search);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? items?.find((item) => item === value) : "Select item..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} ref={inputRef} value={search} onValueChange={setSearch} />
          <CommandEmpty>
            No item found.
            <Button variant="outline" size="sm" className="mt-2 w-full" onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add &quot;{search}&quot;
            </Button>
          </CommandEmpty>
          <CommandGroup>
            {filteredItems?.map((item) => (
              <CommandItem key={item} value={item} onSelect={handleSelect}>
                <Check className={cn("mr-2 h-4 w-4", value === item ? "opacity-100" : "opacity-0")} />
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
