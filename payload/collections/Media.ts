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
import { getPlaiceholder } from "plaiceholder";

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
    // afterChange: [
    //   async ({ doc }) => {
    //     const src = `${
    //       (process.env.NEXT_PUBLIC_SERVER_URL as string) ||
    //       (`https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}` as string)
    //     }${doc.url}`;

    //     const buffer =
    //       await fetch(
    //     src).then(async (res) => Buffer.from(await res.arrayBuffer()));
    //     const { base64 } = await getPlaiceholder(buffer, { size: 64 });
    //     doc.plaiceholder = base64;

    //     return doc;
    //   },
    // ],
    beforeChange: [
      async ({ req, data }) => {
        const file = req.file?.data;

        if (!file) {
          return data;
        }

        const { base64 } = await getPlaiceholder(file, { size: 64 });

        data.plaiceholder = base64;

        return data;
      },
    ],
  },
};
