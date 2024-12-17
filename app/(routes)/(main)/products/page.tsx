import ProductsLayout from "@/components/products/products-layout";

export default function AllProductsPage() {
  const categories: ICategory[] = [
    {
      name: "Marble",
      subCategories: ["White Marble", "Black Marble", "Grey Marble", "Beige Marble"],
    },
    {
      name: "Granite",
      subCategories: ["Black Granite", "Grey Granite", "Red Granite"],
    },
    {
      name: "Quartz Stone",
      subCategories: ["Engineered Quartz", "Natural Quartz"],
    },
    {
      name: "Artificial Marble",
      subCategories: ["Engineered Marble", "Composite Marble"],
    },
    {
      name: "Nano Crystal Glass",
      subCategories: ["Crystallized Glass", "Nano Stone"],
    },
    {
      name: "Sintered Stone",
      subCategories: ["Large Format", "Countertops"],
    },
    {
      name: "Travertine",
      subCategories: ["Filled", "Unfilled"],
    },
    {
      name: "Sandstone",
      subCategories: ["Beige Sandstone", "Red Sandstone"],
    },
    {
      name: "Pebble Stone",
      subCategories: ["River Pebbles", "Beach Pebbles"],
    },
  ];

  const products: IProduct[] = [
    {
      id: "1",
      name: "Fendi White Marble",
      image: "/placeholder.svg?height=400&width=600",
      category: "Marble",
      subCategory: "White Marble",
    },
    {
      id: "2",
      name: "Blue Grey Marble Slab",
      image: "/placeholder.svg?height=400&width=600",
      category: "Marble",
      subCategory: "Grey Marble",
    },
    {
      id: "3",
      name: "White Oak Marble Slab",
      image: "/placeholder.svg?height=400&width=600",
      category: "Marble",
      subCategory: "White Marble",
    },
  ];

  return <ProductsLayout categories={categories} products={products} />;
}
