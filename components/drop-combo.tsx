"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

import _ from "lodash";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ComboboxProps = {
  items: string[];
  onSelect: () => void;
  defaultValue?: string;
};

export function DropCombo({ items, onSelect, defaultValue }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value || "Select..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command defaultValue={defaultValue} onSelect={onSelect}>
          <CommandInput placeholder="Search..." onValueChange={(value) => setSearch(value)} value={search} />
          <CommandEmpty>
            <p>No match found</p>
            <Button
              onClick={() => {
                setValue(_.capitalize(search));
                setOpen(false);
              }}
              variant="ghost"
            >
              Create {_.capitalize(search)}
            </Button>
          </CommandEmpty>
          <CommandList>
            <CommandGroup>
              {/* <CommandItem
                value={_.capitalize(search)}
                aria-checked={value === search}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {_.capitalize(search)}
              </CommandItem> */}
              {items?.map((item) => (
                <CommandItem
                  key={item}
                  value={_.capitalize(item)}
                  aria-checked={value === item}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === item ? "opacity-100" : "opacity-0")} />
                  {_.capitalize(item)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
