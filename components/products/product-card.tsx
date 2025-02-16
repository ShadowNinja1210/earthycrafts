import { INewProduct } from "@/lib/schema";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { imgPlaceholder } from "@/public/assets/some-data";
import Link from "next/link";

import { kebabCase } from "lodash";
import { cn } from "@/lib/utils";

export default function ProductCard({
  product,
  className,
}: {
  product: INewProduct;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) {
  const mainImage = product?.images?.find((img) => img.main);

  return (
    <Card className={cn(className, "w-80 overflow-hidden")}>
      <CardContent className="p-0 w-80 overflow-hidden h-[480px] ">
        <Link href={`/products/${kebabCase(product.productCode)}`}>
          <Image
            src={mainImage?.image || imgPlaceholder}
            alt={product.name}
            width={320}
            height={500}
            className=" object-cover h-[400px] rounded-lg overflow-hidden"
          />
          <div className="p-4 ">
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.stoneName}</CardDescription>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
