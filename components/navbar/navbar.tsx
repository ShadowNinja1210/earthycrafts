"use client";

import Link from "next/link";
import SearchComponent from "./search-component";
import Explore from "./explore";

export default function Navbar() {
  return (
    <nav className="flex justify-between py-4 px-10">
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
        Earthycrafts
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
    </nav>
  );
}
