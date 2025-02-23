import GridLayout from "../grid-layout";

const categories = [
  {
    id: 1,
    title: "Design your home",
    description: "Handmade with love, each piece is as unique as its origin.",
    videoUrl: "/videos/categories/home.mp4",
    link: "/products?category=home",
  },
  {
    id: 2,
    title: "Outdoor Spaces",
    description: "Handmade with love, each piece is uniquely imagined.",
    videoUrl: "/videos/categories/outdoor.mp4",
    link: "/products?category=outdoor",
  },
  {
    id: 3,
    title: "Garden & Landscaping",
    description: "Handmade with love, each piece is as earthy and alive as your beautiful garden",
    videoUrl: "/videos/categories/garden-landscape.mp4",
    link: "/products?category=garden-landscape",
  },
];

export default function CategorySection() {
  return (
    <section className="container mx-auto md:px-24 sm:px-16 px-8 md:py-12 py-4">
      <div className="text-center md:mb-12 max-w-3xl mx-auto">
        <h1 className=" sm:text-xl md:text-2xl font-serif mb-4">
          Celebrating the rhythm of life, our places bear the beautiful traces of time. As symbols of a shared journey,
          as reflection of your personality.
        </h1>
      </div>

      <GridLayout categories={categories} />
    </section>
  );
}
