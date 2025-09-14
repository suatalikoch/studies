"use client";

import Link from "next/link";
import { GraduationCap, Search, Settings } from "lucide-react";
import { useUser } from "@/hooks";
import {
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NotificationMenu,
} from "@/components/UI";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function HeaderLanding() {
  const user = useUser();

  return (
    <header className="sticky top-0 z-1 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-600 px-3 sm:px-6 py-2 sm:py-4 flex-shrink-0 overflow-x-auto sm:overflow-x-visible">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <h1 className="text-sm sm:text-2xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
              Student Hub
            </h1>
          </Link>

          <NavigationMenu viewport={false} className="z-1">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Beautifully designed components built with Tailwind
                            CSS.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <Link
                      href="/docs"
                      className="p-2 from-muted to-muted hover:bg-linear-to-b rounded-sm transition-colors"
                    >
                      <h6 className="text-sm text-black dark:text-gray-100 font-medium">
                        Introduction
                      </h6>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        Re-usable components built using Radix UI and Tailwind
                        CSS.
                      </p>
                    </Link>
                    <Link
                      href="/docs/installation"
                      className="p-2 from-muted to-muted hover:bg-linear-to-b rounded-sm transition-colors"
                    >
                      <h6 className="text-sm text-black dark:text-gray-100 font-medium">
                        Installation
                      </h6>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        How to install dependencies and structure your app.
                      </p>
                    </Link>
                    <Link
                      href="/docs/primitives/typography"
                      className="p-2 from-muted to-muted hover:bg-linear-to-b rounded-sm transition-colors"
                    >
                      <h6 className="text-sm text-black dark:text-gray-100 font-medium">
                        Typography
                      </h6>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        Styles for headings, paragraphs, lists...etc
                      </p>
                    </Link>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <Link
                        key={component.title}
                        href={component.href}
                        className="p-2 from-muted to-muted hover:bg-linear-to-b rounded-sm transition-colors"
                      >
                        <h6 className="text-sm text-black dark:text-gray-100">
                          {component.title}
                        </h6>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {component.description}
                        </p>
                      </Link>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>List</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium">Components</div>
                          <div className="text-muted-foreground">
                            Browse all components in the library.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium">Documentation</div>
                          <div className="text-muted-foreground">
                            Learn how to use the library.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium">Blog</div>
                          <div className="text-muted-foreground">
                            Read our latest blog posts.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/pricing">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/blog">Blog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              aria-label="Search everything"
              placeholder="Search everything..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            {!user ? "" : <NotificationMenu />}

            <Link href="/settings" className="hidden sm:block">
              <Button title="Settings" variant="ghost" size="icon">
                <Settings className="w-5 h-5 dark:text-gray-400" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
