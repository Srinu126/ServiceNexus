"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useSession } from "next-auth/react";

const services: { title: string; href: string; description: string }[] = [
  {
    title: "Home Cleaning",
    href: "/services/Home_Cleaning_Service",
    description:
      "Professional cleaning services for homes, ensuring a sparkling clean environment tailored to your needs.",
  },
  {
    title: "Plumbing",
    href: "/services/Plumbing_Repairs",
    description:
      "Experienced plumbers offering repair and maintenance for all plumbing needs, from leaks to installations.",
  },
  {
    title: "Electrical Services",
    href: "/services/Electrical_Works",
    description:
      "Skilled electricians ready to handle electrical installations, repairs, and inspections safely and efficiently.",
  },
  {
    title: "Gardening",
    href: "/services/Gardening_and_Landscaping",
    description:
      "Comprehensive gardening services, including lawn care, landscaping, and garden design for a lush, vibrant space.",
  },
  {
    title: "Cooking and Catering",
    href: "/services/Cooking_and_Catering",
    description: "Delicious meals and catering services.",
  },
  {
    title: "Handyman Services",
    href: "/services/Car_Repair_and_Maintenance",
    description:
      "Versatile handyman services for various tasks, including repairs, maintenance, and home improvement projects.",
  },
];

export function NavigationMenuDemo() {
  const { data: session } = useSession();
  return (
    <NavigationMenu className="text-white">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent className="navbar-card">
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <img
                      src="/plumbing.webp"
                      alt="navigation"
                      className="w-3/4 h-1/2"
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      ServiceNexus
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Connecting you with trusted professionals for all your
                      service needs.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Learn about ServiceNexus, a platform for professional services.
              </ListItem>
              <ListItem href="/docs/installation" title="Getting Started">
                How to set up your profile and request services.
              </ListItem>
              <ListItem href="/docs/contact" title="Contact Us">
                Get in touch for any inquiries or support.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href="/services">Services</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="navbar-card">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {services.map((service) => (
                <ListItem
                  key={service.title}
                  title={service.title}
                  href={service.href}
                >
                  {service.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/bookings" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              My Bookings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {session?.user && (
          <NavigationMenuItem>
            <Link href="/create-service" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Create Service
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
