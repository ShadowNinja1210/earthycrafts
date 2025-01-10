"use client";

import Link from "next/link";
import SearchComponent from "./search-component";
import Explore from "./explore";
import Image from "next/image";
import NavbarSheet from "./navbar-sheet";
import { cn } from "@/lib/utils";

export default function Navbar({ className }: { className?: string }) {
  return (
    <>
      <nav className={cn("md:hidden w-full ", className)}>
        <div className="flex bg-white justify-between py-2 px-3 z-10">
          {/* Navbar Sheet */}
          <NavbarSheet />

          {/* Centered Logo */}
          <Link href="/home" className="font-extrabold text-3xl">
            <Image src="/images/logo.svg" width={150} height={70} alt="Logo" />
          </Link>

          <SearchComponent />
        </div>
      </nav>

      {/* Navbar for Large & Medium Devices */}
      <nav className={cn("w-full", className)}>
        <div className="md:flex bg-white hidden justify-between py-4 px-10 z-50">
          {/* Left-side links list for Large & Medium Devices */}
          <ul className="flex gap-6 font-medium items-center">
            {/* Store Hover Card */}
            <Explore />

            <Link href="/customization" className="hover:text-neutral-600 transition-all">
              Customization
            </Link>

            <Link className="hover:text-neutral-600 transition-all" href="/contact">
              Customer Service
            </Link>
          </ul>

          {/* Centered Logo */}
          <Link href="/home" className="font-extrabold text-3xl">
            <Image src="/images/logo.svg" width={150} height={70} alt="Logo" />
          </Link>

          {/* Right-side links list */}
          <ul className="flex gap-6 font-medium items-center">
            <SearchComponent />
            <Link className="hover:text-neutral-600 transition-all" href="/gallery">
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
