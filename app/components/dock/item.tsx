"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DockItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();
  let active = false;

  if (href === "/") {
    active = pathname === href;
  } else {
    active = pathname.startsWith(href);
  }

  return (
    // @ts-ignore
    <dock-item suppressHydrationWarning>
      <Link
        href={href}
        className={cn("dock-item transition ", active && "active")}
      >
        {children}
      </Link>

      {/* @ts-ignore */}
    </dock-item>
  );
};

export default DockItem;
