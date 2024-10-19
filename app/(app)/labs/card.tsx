import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";

import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 64 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

export const Card: React.FC<{
  title: string;
  image?: string;
  video?: string;
  href: string;
  date: string;
  className?: string;
  dark?: boolean;
}> = async ({ title, image, href, date, video, dark }) => {
  const { base64, img } = image
    ? await getImage(image)
    : { base64: "", img: { src: "" } };

  return (
    <Link
      target="_self"
      className="w-full break-inside-avoid-column h-auto group rounded-2xl outline-none block mb-2 focus-visible:ring-1 ring-neutral-950 dark:ring-neutral-50"
      href={href}
    >
      <div className="w-full h-auto p-1 bg-gray-2 rounded-[12px] border ">
        <div className="w-full h-auto relative overflow-hidden rounded-[8px]">
          {image && (
            <Image
              {...img}
              alt={title}
              blurDataURL={base64}
              placeholder="blur"
            />
          )}{" "}
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
          <div className="absolute top-0 left-0 h-full w-full">
            <div className="p-3 sm:p-4 w-full h-full flex justify-between items-end">
              <div
                className={cn(
                  "text-xs sm:text-sm flex gap-1 justify-start items-center",
                  dark ? "text-neutral-100" : "text-neutral-900"
                )}
              >
                <span>{title}</span>
              </div>
              <p
                className={cn(
                  "text-xs",
                  dark ? " text-neutral-400" : " text-neutral-500"
                )}
              >
                {date}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-3 group-hover:bg-gray-4 transition rounded-[8px] mt-1 text-center py-2 px-2 font-semibold text-[13px]">
          View Prototype &rarr;
        </div>
      </div>
    </Link>
  );
};
