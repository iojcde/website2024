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
    <dock-item
      onMouseUp={(e: any) => {
        e.preventDefault();
        // change className

        (e.target as HTMLElement).closest("a")?.classList.remove("down");
        (e.target as HTMLElement).closest("a")?.classList.add("up");

        setTimeout(() => {
          (e.target as HTMLElement).closest("a")?.classList.remove("up");
        }, 300);
      }}
      onMouseDown={(e: any) => {
        e.preventDefault();
        // change className
        (e.target as HTMLElement).closest("a")?.classList.add("down");
      }}
    >
      <Link
        href={href}
        className={cn(
          "dock-item transition target:-translate-y-2",
          active && "active"
        )}
      >
        {children}
      </Link>

      {/* @ts-ignore */}
    </dock-item>
  );
};

export default DockItem;
