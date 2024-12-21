import ProductsLayout from "@/components/products/products-layout";
import { IProduct } from "@/lib/schema";

export default async function AllProductsPage() {
  let products: IProduct[] = [];

  try {
    const response = await fetch("http://localhost:3000/api/product");
    products = await response.json();
  } catch (error) {
    console.error(error);
  }

  const categoryMap = new Map();

  products.forEach((product) => {
    const { category, subCategory } = product;

    if (!categoryMap.has(category)) {
      categoryMap.set(category, new Set());
    }

    categoryMap.get(category).add(subCategory);
  });

  const categories = Array.from(categoryMap, ([name, subCategoriesSet]) => ({
    name,
    subCategories: Array.from(subCategoriesSet) as string[],
  }));

  // const categories = [
  //   {
  //     name: "Marble",
  //     subCategories: ["White Marble", "Black Marble", "Grey Marble", "Beige Marble"],
  //   },
  //   {
  //     name: "Granite",
  //     subCategories: ["Black Granite", "Grey Granite", "Red Granite"],
  //   },
  //   {
  //     name: "Quartz Stone",
  //     subCategories: ["Engineered Quartz", "Natural Quartz"],
  //   },
  //   {
  //     name: "Artificial Marble",
  //     subCategories: ["Engineered Marble", "Composite Marble"],
  //   },
  //   {
  //     name: "Nano Crystal Glass",
  //     subCategories: ["Crystallized Glass", "Nano Stone"],
  //   },
  //   {
  //     name: "Sintered Stone",
  //     subCategories: ["Large Format", "Countertops"],
  //   },
  //   {
  //     name: "Travertine",
  //     subCategories: ["Filled", "Unfilled"],
  //   },
  //   {
  //     name: "Sandstone",
  //     subCategories: ["Beige Sandstone", "Red Sandstone"],
  //   },
  //   {
  //     name: "Pebble Stone",
  //     subCategories: ["River Pebbles", "Beach Pebbles"],
  //   },
  // ];

  return <ProductsLayout categories={categories} products={products} />;
}
