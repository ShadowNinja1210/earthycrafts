import Image from "next/image";
import Link from "next/link";
import { imgPlaceholder, stonesLink } from "@/public/assets/some-data";

export const StoneCard = ({
  stone,
}: {
  stone: {
    name: string;
    url: string;
    image: string;
  };
}) => {
  return (
    <Link href={stone.url} className="group flex flex-col gap-2">
      <div className="rounded-md h-80 w-80 overflow-hidden object-center hover:shadow-md transition-all duration-300">
        <Image
          src={stone.image || imgPlaceholder}
          alt={stone.name}
          height={500}
          width={500}
          className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <p className="font-medium">{stone.name}</p>
    </Link>
  );
};

export default function StonesPage() {
  return (
    <div className="container mx-auto p-4 min-h-screen lg:px-12 md:px-8 sm:px-6">
      <h1 className="text-2xl font-bold mb-6 flex sm:justify-between justify-center items-center">
        Know about our Stones
      </h1>

      <div className="grid justify-items-center grid-flow-row-dense auto-rows-max grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
        {stonesLink.map((stone, index) => (
          <StoneCard stone={stone} key={index} />
        ))}
      </div>
    </div>
  );
}
