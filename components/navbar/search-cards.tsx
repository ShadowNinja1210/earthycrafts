import { IProduct } from "@/lib/schema";
import { kebabCase, capitalize, truncate, upperCase } from "lodash";
import Image from "next/image";
import Link from "next/link";

import { imgPlaceholder } from "@/public/assets/some-data";
import TooltipContext from "../contexts/tooltip-context";

export default function SearchCards({ product }: { product: IProduct }) {
  const imageUrl = product.images?.filter((image) => image.main)[0]?.image;

  return (
    <TooltipContext context={product.name}>
      <Link
        href={"/home/product/" + kebabCase(product.productCode)}
        className=" grid grid-cols-3 gap-2 hover:shadow-md shadow-sm rounded-md bg-neutral-50 overflow-hidden"
      >
        <Image
          src={imageUrl || imgPlaceholder}
          alt="Earthycrafts Logo"
          width={200}
          height={200}
          className=" h-full object-cover overflow-hidden"
          placeholder="blur"
          blurDataURL={imgPlaceholder}
        />
        <div className="col-span-2 p-1 flex flex-col">
          <p className="font-semibold text-sm">{`${truncate(capitalize(product.name), {
            length: 32,
            separator: " ",
          })} (${upperCase(product.productCode)})`}</p>
          <p className="text-sm text-muted-foreground">{capitalize(product.subCategory)}</p>
        </div>
      </Link>
    </TooltipContext>
  );
}
