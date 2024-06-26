"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { ModeToggle } from "./darkmode-toggler";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export const MainNav = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  //DECLARING VARIABLES TO STORE THE PATHNAME AND PARAMS

  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);

  //CREATING AN OBJECT ARRAY TO STORE THE ROUTES
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },

    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  //RETURNING THE NAVIGATION BAR

  return (
    <>
      <nav
        className={cn(
          "lg:flex items-center space-x-4 lg:space-x-6 hidden",
          className
        )}
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
        <ModeToggle />
      </nav>

      {/* NAVIGATION BAR ON MOBILE */}

      <div className="lg:hidden p-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="h-8 w-8 p-0" variant={"ghost"}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className={"p-0 w-[65%] lg:hidden"}>
            <div className="">
              <SheetHeader className="mt-3 ml-4">
                <SheetTitle className="font-bold text-xl tracking-tighter text-center">
                  E-ComStore
                </SheetTitle>
                <Separator />
                <ModeToggle />
              </SheetHeader>

              <nav
                className={cn("space-y-4 flex flex-col ml-8 mt-6", className)}
              >
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      route.active
                        ? "text-black dark:text-white"
                        : "text-muted-foreground"
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
