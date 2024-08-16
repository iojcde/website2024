import type { CollectionConfig } from "payload";

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
    {
      name: "plaiceholder",
      type: "text",
    },
  ],
  hooks: {
    afterChange: [
      ({ doc }) => {
        if (doc.plaiceholder) {
          const { base64 } = JSON.parse(doc.plaiceholder);
          doc.plaiceholder = base64;
        }
        return doc;
      },
    ],
  },
};
