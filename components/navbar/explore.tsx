import Image from "next/image";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import useCategoriesLinks from "@/hooks/navbar-links";

export default function Explore() {
  const { primaryCategories, secondaryCategories } = useCategoriesLinks();

  return (
    <div className="grid gap-6 p-6 md:w-[800px] lg:w-[900px]">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Primary Categories</h3>
          <Button variant="link" size="sm">
            View all
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {primaryCategories.map((category) => (
            <NavigationMenuLink asChild key={category.title}>
              <a
                className="group grid h-full w-full items-center justify-start gap-4 rounded-md border p-4 hover:bg-muted"
                href={category.link}
              >
                <div className="flex aspect-square w-32 items-center justify-center rounded-md border bg-muted">
                  <video
                    className="aspect-square rounded-md object-cover"
                    height={120}
                    width={120}
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={category.image} type="video/mp4" />
                  </video>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm font-medium leading-none group-hover:underline">{category.title}</div>
                  <div className="line-clamp-2 text-sm text-muted-foreground">{category.description}</div>
                </div>
              </a>
            </NavigationMenuLink>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Secondary Categories</h3>
          <Button variant="link" size="sm">
            View all
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {secondaryCategories.map((category) => (
            <NavigationMenuLink asChild key={category.title}>
              <Link
                className="group flex flex-col items-center gap-2 rounded-md p-2 hover:bg-muted"
                href={category.link}
              >
                <div className="flex aspect-square w-16 items-center justify-center rounded-md border bg-muted">
                  {category.image.includes(".mp4") ? (
                    <video
                      className="aspect-square rounded-md object-cover"
                      height={80}
                      width={80}
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={category.image} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      alt={category.title}
                      className="aspect-square rounded-md object-cover"
                      height={80}
                      src={category.image || "/placeholder.svg"}
                      width={80}
                    />
                  )}
                </div>
                <span className="text-sm font-medium capitalize group-hover:underline">{category.title}</span>
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      </div>
    </div>
  );
}
