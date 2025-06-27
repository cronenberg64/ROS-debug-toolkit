"use client";

import {
  FileCode2,
  GitFork,
  HelpCircle,
  LayoutDashboard,
  Terminal,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";

const navItems = [
  {
    href: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    href: "/ros-qa",
    icon: <HelpCircle />,
    label: "Q&A",
  },
  {
    href: "/tf-tree-analyzer",
    icon: <GitFork />,
    label: "TF Tree Analyzer",
  },
  {
    href: "/launch-file-debugger",
    icon: <FileCode2 />,
    label: "Launch Debugger",
  },
  {
    href: "/colcon-build-analyzer",
    icon: <Terminal />,
    label: "Colcon Analyzer",
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={{ children: item.label, side: "right" }}
          >
            <Link href={item.href}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
