import Link from "next/link";
import { components } from "@/lib/constants";
import {
  NavigationMenu as NavMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/UI";

export default function NavigationMenu() {
  return (
    <NavMenu viewport={false} className="z-1">
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
                    <div className="mt-4 mb-2 text-lg">shadcn/ui</div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <Link
                href="/docs"
                className="p-2 from-muted to-muted hover:bg-linear-to-b rounded-sm transition-colors"
              >
                <h6 className="text-sm">Introduction</h6>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </p>
              </Link>
              <Link
                href="/docs/installation"
                className="p-2 from-muted to-muted hover:bg-linear-to-b rounded-sm transition-colors"
              >
                <h6 className="text-sm ">Installation</h6>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  How to install dependencies and structure your app.
                </p>
              </Link>
              <Link
                href="/docs/primitives/typography"
                className="p-2 from-muted to-muted hover:bg-linear-to-b rounded-sm transition-colors"
              >
                <h6 className="text-sm ">Typography</h6>
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
                  <h6 className="text-sm">{component.title}</h6>
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
                    <div>Components</div>
                    <div className="text-muted-foreground">
                      Browse all components in the library.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div>Documentation</div>
                    <div className="text-muted-foreground">
                      Learn how to use the library.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div>Blog</div>
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
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/pricing">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/blog">Blog</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavMenu>
  );
}
