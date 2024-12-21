import { IProduct } from "@/lib/schema";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { imgPlaceholder } from "@/public/assets/some-data";
import Link from "next/link";

import { kebabCase } from "lodash";
import { cn } from "@/lib/utils";

export default function ProductCard({
  product,
  className,
  style,
}: {
  product: IProduct;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
}) {
  const mainImage = product?.images?.find((img) => img.main);

  return (
    <Link href={`/products/${kebabCase(product.productCode)}`}>
      <Card className={cn(className)} style={style}>
        <CardContent className="p-0 w-80 overflow-hidden h-[480px]">
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
        </CardContent>
      </Card>
    </Link>
  );
}
