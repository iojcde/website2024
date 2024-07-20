import Link from "next/link";

export const Card: React.FC<{
  title: string;
  image?: string;
  video?: string;
  href: string;
  date: string;
  className?: string;
}> = ({ title, image, href, date, video, className }) => (
  <Link
    target="_self"
    className="w-full h-auto group rounded-xl outline-none block mb-4 focus-visible:ring-1 ring-neutral-950 dark:ring-neutral-50"
    href={href}
  >
    <div className="w-full h-auto p-1 rounded-xl border bg-gray-2">
      <div className="w-full h-auto relative overflow-hidden rounded-lg">
        {image && <img src={image} />}{" "}
        {video && (
          <video
            className="w-full h-auto object-cover"
            src={video}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
        {/* <div className="absolute top-0 left-0 h-full w-full bg-no-repeat bg-cover blur-lg z-10"></div> */}
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
