"use client";

import Link from "next/link";
import SearchComponent from "./search-component";
import Explore from "./explore";
import Image from "next/image";
import NavbarSheet from "./navbar-sheet";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar({ className }: { className?: string }) {
  return (
    <>
      <nav className={cn("md:hidden w-full ", className)}>
        <div className="flex bg-white justify-between py-2 px-3 z-10">
          {/* Navbar Sheet */}
          <NavbarSheet />

          {/* Centered Logo */}
          <Link href="/" className="font-extrabold text-3xl">
            <Image src="/images/logo.svg" width={150} height={70} alt="Logo" />
          </Link>

          <SearchComponent />
        </div>
      </nav>

      {/* Navbar for Large & Medium Devices */}
      <nav className={cn("w-full", className)}>
        <div className="md:flex bg-white hidden justify-between py-4 px-10 z-50">
          {/* Left-side links list for Large & Medium Devices */}
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6 font-medium items-center">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base">Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Explore />
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/customization" legacyBehavior passHref>
                  <NavigationMenuLink className="text-base">Customization</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className="text-base">Customer Service</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Centered Logo */}
          <Link href="/" className="font-extrabold text-3xl">
            <Image src="/images/logo.svg" width={150} height={70} alt="Logo" />
          </Link>

          {/* Right-side links list */}
          <ul className="flex gap-6 font-medium items-center">
            <SearchComponent />
            <Link className="hover:text-neutral-600 transition-all" href="/inspiration">
              Inspiration
            </Link>
            <Link className="hover:text-neutral-600 transition-all" href="/about">
              About
            </Link>
          </ul>
        </div>
      </nav>
    </>
  );
}
