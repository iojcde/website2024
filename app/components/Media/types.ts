import type { StaticImageData } from "next/image";
import type { ElementType, Ref } from "react";

import type { Media as MediaType } from "../../../payload-types";

export interface Props {
  alt?: string;
  className?: string;
  fill?: boolean; // for NextImage only
  onClick?: () => void;
  onLoad?: () => void;
  priority?: boolean; // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>;
  resource?: MediaType | string | number; // for Payload media
  size?: string; // for NextImage only
  src?: StaticImageData; // for static
}
