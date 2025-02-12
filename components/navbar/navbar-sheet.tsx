"use client";

import { useState } from "react";
import Link from "next/link";
import { BrickWall, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import _ from "lodash";

const primaryCategories = [
  { name: "Design your home", href: "/products?primary=home" },
  { name: "Outdoor Spaces", href: "/products?primary=outdoor" },
  { name: "Landscape & Garden", href: "/products?primary=landscape" },
];

const secondaryCategories = [
  "Agra Red",
  "Bali",
  "Beslana",
  "Blue Pottery",
  "Furniture",
  "Handicraft",
  "Sandstone",
  "Temple",
  "Tukdi Art",
  "White Marble",
];

export default function NavbarSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="sm:p-6 p-4">
            <SheetTitle className="text-2xl">Menu</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 border-t">
            <div className="p-6">
              <nav className="flex flex-col space-y-4">
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
                              className="block py-2 px-4 text-base font-semibold hover:bg-accent rounded-md"
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
                              href={`/products?secondary=${_.kebabCase(category)}`}
                              className="block py-2 px-4 text-base font-semibold hover:bg-accent rounded-md"
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

                <Link href="/inspiration" className="text-lg font-semibold" onClick={() => setOpen(false)}>
                  Inspiration
                </Link>

                <Separator />

                <Link href="/about" className="text-lg font-semibold" onClick={() => setOpen(false)}>
                  About
                </Link>
              </nav>
            </div>
          </ScrollArea>
          <div className="border-t sm:p-6 p-4">
            <Button className="w-full text-base" size="lg" onClick={() => setOpen(false)}>
              Customer Service
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
