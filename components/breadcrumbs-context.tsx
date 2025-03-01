import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { kebabCase, lowerCase } from "lodash";

export default function BreadcrumbsContext({ items, className }: { items: string[]; className?: string }) {
  return (
    <Breadcrumb className={cn("", className)}>
      <BreadcrumbList>
        {items.map((item, index) =>
          index === items.length - 1 ? (
            <BreadcrumbItem key={index}>
              <BreadcrumbPage>{item}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={`/${kebabCase(item)}`}>
                  {item === "tukdi art"
                    ? "Artisan Stone Mosaic"
                    : item === "bali marble" || item === "bali stone" || item === "bali"
                    ? "Bali Stone"
                    : item === "artifacts"
                    ? "Artefacts"
                    : lowerCase(item)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator key={index} />
            </>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
