"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const MainNav = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  //DECLARING VARIABLES TO STORE THE PATHNAME AND PARAMS

  const pathname = usePathname();
  const params = useParams();

  //CREATING AN OBJECT ARRAY TO STORE THE ROUTES
  const routes = [
    {
      href: `/${params.storeId}/overview`,
      label: "Overview",
      active: pathname === `/${params.storeId}/overview`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  //RETURNING THE NAVIGATION BAR

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
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
    </nav>
  );
};
