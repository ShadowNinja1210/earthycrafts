import { getStoneInfo, getStonesProduct } from "@/lib/api";
import ProductCard from "@/components/products/product-card";
import type { INewProduct } from "@/lib/schema";
import StoneImageCarousel from "@/components/inspiration/components/stone-image-card";
import { lowerCase } from "lodash";
import { notFound } from "next/navigation";

export default async function StonePage({ params }: { params: { stone: string } }) {
  const stoneName = lowerCase(params.stone);
  const stoneInfo = await getStoneInfo(stoneName);
  const products = await getStonesProduct(stoneName);

  if (!stoneInfo) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{stoneInfo.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <StoneImageCarousel images={stoneInfo.images} stoneName={stoneInfo.name} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Description</h2>
          {stoneInfo.description.map((description, index) => (
            <p key={index} className="text-lg mb-4">
              {description}
            </p>
          ))}
          <h2 className="text-2xl font-semibold mb-2">Characteristics</h2>
          <ul className="list-disc list-inside">
            {stoneInfo.characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Products made with {stoneInfo.name}</h2>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        {products.map((product: INewProduct) => (
          <ProductCard key={product._id.toString()} product={product} />
        ))}
      </div>
    </div>
  );
}
