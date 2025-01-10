import { imgPlaceholder } from "@/public/assets/some-data";
import Image from "next/image";
import imgUrl from "@/public/images/we-care-section.jpg";

export default function WeCareSection() {
  return (
    <section className="h-screen p-8 relative">
      <Image
        src="/images/we_care-text.png"
        alt="We care about your space"
        height={500}
        width={500}
        className="absolute sm:scale-100 scale-[0.6] top-1/2 z-20 -translate-y-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap drop-shadow-sm"
      />
      <Image
        src={imgUrl || imgPlaceholder}
        alt="We care about your space"
        className="object-cover brightness-50"
        fill
      />
    </section>
  );
}
