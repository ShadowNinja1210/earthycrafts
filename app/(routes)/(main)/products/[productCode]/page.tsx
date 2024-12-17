import { notFound } from "next/navigation";
import ProductDetails from "@/components/products/product-page";
import { IProduct } from "@/lib/schema";

async function getProduct(id: string): Promise<IProduct | null> {
  const response = await fetch(`http://localhost:3000/api/product/${id}`);

  if (!response.ok) {
    return null;
  }

  const product = await response.json();

  return product;
}

export default async function ProductPage({ params }: { params: { productCode: string } }) {
  const product = await getProduct(params.productCode);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
