import Link from "next/link";

export const Card: React.FC<{
  title: string;
  image: string;
  href: string;
  date: string;
}> = ({ title, image, href, date }) => (
  <Link
    target="_self"
    className="w-full h-auto group rounded-xl outline-none focus-visible:ring-1 ring-neutral-950 dark:ring-neutral-50"
    href={href}
  >
    <div className="w-full h-auto p-1 rounded-xl bg-gradient-to-t from-neutral-300 dark:from-neutral-800 to-neutral-200 dark:to-neutral-900 border border-neutral-300 dark:border-neutral-800">
      <div className="w-full h-auto relative overflow-hidden rounded-lg">
        <img src={image} />
        <div className="absolute top-0 left-0 h-full w-full bg-no-repeat bg-cover blur-lg z-10"></div>
        <div className="absolute top-0 left-0 h-full w-full z-30 bg-gradient-to-b opacity-75 from-transparent from-0% to-neutral-925 group-hover:opacity-95 transition-all duration-500"></div>
        <div className="absolute top-0 left-0 h-full w-full z-40">
          <div className="p-3 sm:p-4 w-full h-full flex justify-between items-end">
            <div className="text-xs sm:text-sm text-neutral-300 flex gap-1 justify-start items-center">
              <span>{title}</span>
            </div>
            <p className="text-xs  text-neutral-400">{date}</p>
          </div>
        </div>
      </div>
    </div>
  </Link>
);
