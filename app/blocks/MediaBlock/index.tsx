import type { StaticImageData } from "next/image";

import { cn } from "@/lib/utils";
import React from "react";
import RichText from "@/app/components/RichText";
import { MediaBlock as MediaBlockProps } from "@/payload-types";
import { Media } from "@/app/components/Media";

type Props = MediaBlockProps & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  id?: string;
  imgClassName?: string;
  staticImage?: StaticImageData;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    imgClassName,
    media,
    position = "default",
    staticImage,
  } = props;

  let caption;
  if (media && typeof media === "object") caption = media.caption;

  return (
    <>
      {position === "wide" && (
        <Media
          className="lg:w-screen lg:max-w-[900px] max-h-[30rem] rounded-[12px] border lg:left-1/2 lg:right-1/2 relative lg:-translate-x-1/2"
          resource={media}
          src={staticImage}
        />
      )}
      {position === "default" && (
        <Media
          className={cn("rounded-[12px] border", imgClassName)}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <div className={cn(captionClassName, "italic -mt-4 font-medium")}>
          <RichText content={caption} enableGutter={false} />
        </div>
      )}{" "}
    </>
  );
};
