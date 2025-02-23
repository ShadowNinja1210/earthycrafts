import { ArrowRight } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

export default function CustomizeSection() {
  return (
    <section className="h-screen relative">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-6 items-center justify-center z-20">
        <h1 className="lg:text-7xl md:text-6xl z-10 sm:text-4xl text-2xl text-center font-black text-white  whitespace-nowrap drop-shadow-lg flex flex-col gap-4">
          <span>Still confused? Be your</span>
          <span>own designer</span>
        </h1>
        <Link
          className="px-6 py-1 rounded-full gap-2 flex items-center bg-transparent hover:bg-black/20 text-white border-2  group"
          href="/customize"
        >
          <span className="text-lg">Customize</span>
          <ArrowRight className=" w-0 inline-flex group-hover:w-5 transition-all duration-500" />
        </Link>
      </div>
      <Image src="/images/customize-background.jpg" alt="Customize your space" className="object-cover" fill />
    </section>
  );
}
