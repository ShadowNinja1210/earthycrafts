"use client";

import { useState } from "react";
import Link from "next/link";
import { BrickWall, Menu } from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import useCategoriesLinks from "@/hooks/navbar-links";

export default function NavbarSheet() {
  const [open, setOpen] = useState(false);
  const { primaryCategories, secondaryCategories } = useCategoriesLinks();

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
                    <AccordionTrigger className="text-lg pt-0 font-semibold">Shop by Space</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {primaryCategories.map((category) => (
                          <li key={category.title}>
                            <Link
                              href={category.link}
                              className="block py-2 px-4 text-base font-semibold hover:bg-accent rounded-md"
                              onClick={() => setOpen(false)}
                            >
                              {category.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="secondary-categories">
                    <AccordionTrigger className="text-lg font-semibold">Shop by Collection</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {secondaryCategories.map((category) => (
                          <li key={category.title}>
                            <Link
                              href={category.link}
                              className="block py-2 px-4 text-base font-semibold hover:bg-accent rounded-md capitalize"
                              onClick={() => setOpen(false)}
                            >
                              {category.title === "Tukdi Art"
                                ? "Artisan Stone Mosaic"
                                : category.title === "Bali Marble" ||
                                  category.title === "Bali Stone" ||
                                  category.title === "Bali"
                                ? "Bali Stone"
                                : category.title}
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
          <div className="border-t sm:p-6 p-4 flex flex-col gap-4 items-center">
            <div className="flex space-x-4">
              <Link className="group" href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "#"} target="_blank">
                <FaWhatsapp size={24} className=" fill-green-600 group-hover:fill-green-800" />
                <span className=" sr-only">WhatsApp</span>
              </Link>
              <Link
                href={process.env.NEXT_PUBLIC_FB_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaFacebook size={24} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaInstagram size={24} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <FaLinkedin size={24} />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <Link className="w-full" href="/contact" onClick={() => setOpen(false)}>
              <Button className="w-full text-base" size="lg" onClick={() => setOpen(false)}>
                Customer Service
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
