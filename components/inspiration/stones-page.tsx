import Image from "next/image";
import Link from "next/link";
import { imgPlaceholder } from "@/public/assets/some-data";

const stones = [
  {
    name: "Stone 1",
    image: "",
    url: "/stone/1",
  },
  {
    name: "Stone 1",
    image: "",
    url: "/stone/1",
  },
  {
    name: "Stone 1",
    image: "",
    url: "/stone/1",
  },
  {
    name: "Stone 1",
    image: "",
    url: "/stone/1",
  },
  {
    name: "Stone 1",
    image: "",
    url: "/stone/1",
  },
];

export default function StonesPage() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex justify-between items-center">Know about our Stones</h1>

      <div className="flex gap-4 flex-wrap justify-between mx-auto">
        {stones.map((stone, index) => (
          <Link href={stone.url} key={index} className="group flex flex-col gap-2">
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
        ))}
      </div>
    </div>
  );
}
