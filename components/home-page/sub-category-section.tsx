import GridLayout from "../grid-layout";

const categories1 = [
  {
    id: 1,
    title: "Agra Red",
    description: "Handmade with love.",
    videoUrl: "/images/sub-categories/agra-red.jpg",
    link: "/products?category=agra-red",
  },
  {
    id: 2,
    title: "Sandstone",
    description: "Handmade with love.",
    videoUrl: "/videos/sub-categories/sandstone.mp4",
    link: "/products?category=sandstone",
  },
  {
    id: 3,
    title: "Beslana",
    description: "Handmade with love.",
    videoUrl: "/images/sub-categories/beslana.jpg",
    link: "/products?category=beslana",
  },
];
const categories2 = [
  {
    id: 1,
    title: "Bali",
    description: "Handmade with love.",
    videoUrl: "/videos/sub-categories/bali.mp4",
    link: "products?category=bali-marble",
  },
  {
    id: 2,
    title: "Blue Pottery",
    description: "Handmade with love.",
    videoUrl: "/images/sub-categories/blue-pottery.jpg",
    link: "/products?category=blue-pottery",
  },
  {
    id: 3,
    title: "Tukdi Art",
    description: "Handmade with love.",
    videoUrl: "/images/sub-categories/tukdi.jpg",
    link: "/products?category=tukdi-art",
  },
];

const categories3 = [
  {
    id: 1,
    title: "Temple",
    description: "Handmade with love.",
    videoUrl: "/images/sub-categories/temple.jpg",
    link: "/products?category=temple",
  },
  {
    id: 2,
    title: "White Marble",
    description: "Handmade with love.",
    videoUrl: "/images/sub-categories/white-marble.jpg",
    link: "/products?category=white-marble",
  },
  {
    id: 3,
    title: "Furniture",
    description: "Handmade with love.",
    videoUrl: "/videos/sub-categories/furniture.mp4",
    link: "/products?category=furniture",
  },
  {
    id: 4,
    title: "Handicrafts",
    description: "Handmade with love.",
    videoUrl: "/images/sub-categories/handicrafts.jpg",
    link: "/products?category=handicrafts",
  },
];

export default function SubCategorySection() {
  return (
    <section className="container flex flex-col gap-8 mx-auto md:px-24 sm:px-16 px-8 md:py-12 py-4">
      <GridLayout categories={categories1} className="" right />
      <GridLayout categories={categories2} className="" />
      <GridLayout categories={categories3} className="" />
    </section>
  );
}
