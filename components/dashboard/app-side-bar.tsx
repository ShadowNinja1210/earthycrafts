"use client";

import { SignOutButton } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Hammer, Images, NotebookPen, PackageSearch, SquareChartGantt } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const projects = [
  {
    name: "Products",
    url: "/dashboard/admin/products",
    icon: () => <PackageSearch className="inline-flex w-5 mr-1" />,
  },
  {
    name: "Blogs",
    url: "/dashboard/admin/blogs",
    icon: () => <SquareChartGantt className="inline-flex w-5 mr-1" />,
  },
  {
    name: "Gallery",
    url: "/dashboard/admin/gallery",
    icon: () => <Images className="inline-flex w-5 mr-1" />,
  },
  {
    name: "Enquiries",
    url: "/dashboard/admin/enquiry",
    icon: () => <NotebookPen className="inline-flex w-5 mr-1" />,
  },
  {
    name: "Customizations",
    url: "/dashboard/admin/customizations",
    icon: () => <Hammer className="inline-flex w-5 mr-1 " />,
  },
];

export default function AppSideBar() {
  const url = usePathname();

  return (
    <Sidebar className="">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.name}>
                  <Link href={project.url}>
                    <SidebarMenuButton>
                      <project.icon />
                      <span>{project.name}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SignOutButton redirectUrl={url}>
              <SidebarMenuButton asChild>
                <Button variant="destructive">Sign out</Button>
              </SidebarMenuButton>
            </SignOutButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
