"use client";

import { useState } from "react";
import Link from "next/link";
import { BrickWall, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "../ui/separator";

const primaryCategories = [
  { name: "Design your home", href: "/design-your-home" },
  { name: "Outdoor Spaces", href: "/outdoor-spaces" },
  { name: "Landscape & Garden", href: "/landscape-garden" },
];

const secondaryCategories = [
  "Category 1",
  "Category 2",
  "Category 3",
  "Category 4",
  "Category 5",
  "Category 6",
  "Category 7",
  "Category 8",
  "Category 9",
  "Category 10",
];

export default function NavbarSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-2xl">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-8">
          <Link
            href="/products"
            className="text-lg font-semibold flex justify-between items-center"
            onClick={() => setOpen(false)}
          >
            All Products
            <BrickWall className="w-5 h-5" />
          </Link>

          <Separator />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="primary-categories">
              <AccordionTrigger className="text-lg pt-0 font-semibold">Primary Category</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {primaryCategories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={category.href}
                        className="block py-2 px-4 text-base font-semibold hover:bg-gray-100 rounded-md"
                        onClick={() => setOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="secondary-categories">
              <AccordionTrigger className="text-lg font-semibold">Secondary Category</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  {secondaryCategories.map((category) => (
                    <li key={category}>
                      <Link
                        href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block py-2 px-4 text-base font-semibold hover:bg-gray-100 rounded-md"
                        onClick={() => setOpen(false)}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link href="/customization" className="text-lg font-semibold" onClick={() => setOpen(false)}>
            Customization
          </Link>

          <Separator />

          <Link href="/gallery" className="text-lg font-semibold" onClick={() => setOpen(false)}>
            Inspiration
          </Link>

          <Separator />

          <Link href="/about" className="text-lg font-semibold" onClick={() => setOpen(false)}>
            About
          </Link>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Button className="w-full text-base" size="lg" onClick={() => setOpen(false)}>
            Customer Service
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
