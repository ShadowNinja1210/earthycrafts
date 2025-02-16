import Image from "next/image";
import Link from "next/link";
import { imgPlaceholder } from "@/public/assets/some-data";

const stones = [
  {
    name: "Agra Red",
    image: "/images/stones/agra-red-stone.webp",
    url: "/stones/agra-red",
  },
  {
    name: "Bali Marble",
    image: "/images/stones/bali-marble-stone.webp",
    url: "/stones/bali-marble",
  },
  {
    name: "Beslana",
    image: "/images/stones/beslana.jpeg",
    url: "/stones/beslana",
  },
  {
    name: "Blue Pottery",
    image: "/images/stones/blue-pottery.webp",
    url: "/stones/blue-pottery",
  },
  {
    name: "White Marble",
    image: "/images/stones/white-marble.jpeg",
    url: "/stones/white-marble",
  },
  {
    name: "Tukdi Art",
    image: "/images/stones/tukdi-art.jpg",
    url: "/stones/tukdi-art",
  },
];

export default function StonesPage() {
  return (
    <div className="container mx-auto p-4 min-h-screen lg:px-12 md:px-8 sm:px-6">
      <h1 className="text-2xl font-bold mb-6 flex sm:justify-between justify-center items-center">
        Know about our Stones
      </h1>

      <div className="grid justify-items-center grid-flow-row-dense auto-rows-max grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
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
