"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/sidebar-nav";
import { QrosIcon } from "@/components/icons";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === '/') return 'Dashboard';
    if (pathname === '/ros-qa') return 'Q&A';
    return pathname.split('/').pop()?.replace(/-/g, ' ') ?? 'Dashboard';
  }

  // In a real app, you'd get this from user auth
  const user = {
    name: "ROS Developer",
    email: "dev@example.com",
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="shrink-0" asChild>
              <Link href="/">
                <QrosIcon className="h-5 w-5 text-primary" />
              </Link>
            </Button>
            <div className="flex-1 overflow-hidden">
                <h2 className="font-semibold text-lg truncate">QROS</h2>
                <p className="text-xs text-muted-foreground truncate">Your ROS2 Co-pilot</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
          {/* User info can go here */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="hidden md:block">
              <h1 className={cn("font-semibold text-lg", pathname !== '/ros-qa' && 'capitalize')}>
                {getTitle()}
              </h1>
            </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
