"use client";
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
      <Link href={href} className="dock-item transition target:-translate-y-2">
        {children}
      </Link>

      {active && (
        <div className="absolute scale-[calc(1/attr(scale number))] -bottom-1.5 rounded-full w-1 h-1 bg-gray-4"></div>
      )}
      {/* @ts-ignore */}
    </dock-item>
  );
};

export default DockItem;
