import {
  Button,
  buttonVariants,
  type ButtonProps,
} from "@/app/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

import type { Post } from "../../../payload-types";

type CMSLinkType = {
  appearance?: "inline" | ButtonProps["variant"];
  children?: React.ReactNode;
  className?: string;
  label?: string;
  newTab?: boolean;
  reference?: {
    relationTo: "posts";
    value: Post | string | number;
  };
  size?: ButtonProps["size"];
  type?: "custom" | "reference";
  url?: string;
};

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = "inline",
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props;

  const href =
    type === "reference" &&
    typeof reference?.value === "object" &&
    reference.value.slug
      ? `/${reference.value.slug}`
      : url;

  if (!href) return null;

  const size = sizeFromProps;
  const newTabProps = newTab
    ? { rel: "noopener noreferrer", target: "_blank" }
    : {};

  /* Ensure we don't break any styles set by richText */
  if (appearance === "inline") {
    return (
      <Link
        className={cn(className)}
        href={(href || url) as string}
        {...newTabProps}
      >
        {label && label}
        {children && children}
      </Link>
    );
  }

  return (
    <Link
      className={cn(
        className,
        buttonVariants({
          variant: appearance,
          size,
        })
      )}
      href={(href || url) as string}
      {...newTabProps}
    >
      {label && label}
      {children && children}
    </Link>
  );
};
