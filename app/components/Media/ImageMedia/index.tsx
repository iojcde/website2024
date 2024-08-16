"use client";

import type { StaticImageData } from "next/image";

import { cn } from "@/lib/utils";
import NextImage from "next/image";
import React from "react";

import type { Props as MediaProps } from "../types";

import cssVariables from "@/app/cssVariables";

const { breakpoints } = cssVariables;

export const ImageMedia: React.FC<MediaProps> = (props) => {
  console.log("ImageMedia props", props);
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
  } = props;

  let width: number | undefined;
  let height: number | undefined;
  let alt = altFromProps;
  let src: StaticImageData | string = srcFromProps || "";
  console.log(src);
  if (!src && resource && typeof resource === "object") {
    const {
      alt: altFromResource,
      filename: fullFilename,
      height: fullHeight,
      url,
      width: fullWidth,
    } = resource;

    width = fullWidth as number;
    height = fullHeight as number;
    alt = altFromResource;

    src = `${
      (process.env.NEXT_PUBLIC_SERVER_URL as string) ||
      (process.env.NEXT_PUBLIC_VERCEL_URL as string)
    }${url}`;
  }

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value}px`)
        .join(", ");

  return (
    <NextImage
      alt={alt || ""}
      className={cn(imgClassName)}
      fill={fill}
      height={!fill ? height : undefined}
      onClick={onClick}
      onLoad={() => {
        if (typeof onLoadFromProps === "function") {
          onLoadFromProps();
        }
      }}
      priority={priority}
      quality={90}
      sizes={sizes}
      src={src}
      width={!fill ? width : undefined}
    />
  );
};
