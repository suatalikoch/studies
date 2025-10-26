"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  Button,
  NotificationMenu,
  ThemeToggle,
  BreadcrumbPage,
} from "@/components/UI";
import CommandMenu from "@/components/UI/Special/CommandMenu";
import Banner from "@/components/UI/Special/Banner";

export default function Header() {
  const currentPlan = "Free";

  return (
    <header className="sticky top-0 z-1 bg-white dark:bg-neutral-950 border-b p-2 sm:p-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <div className="flex items-center gap-2">
                  <Banner />
                  <Badge variant="secondary">{currentPlan}</Badge>
                </div>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbPage>
                <BreadcrumbLink>Dashboard</BreadcrumbLink>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <CommandMenu />
          <ThemeToggle />
          <NotificationMenu />
          <Link href="/settings" className="hidden sm:block">
            <Button title="Settings" variant="ghost" size="icon">
              <Settings className="dark:text-muted-foreground" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
