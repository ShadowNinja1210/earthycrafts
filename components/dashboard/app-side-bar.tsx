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
import { Images, PackageSearch, SquareChartGantt } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
              <SidebarMenuButton variant="destructive">Sign out</SidebarMenuButton>
            </SignOutButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}