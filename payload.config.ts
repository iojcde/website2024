import path from "path";
// import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from "payload/i18n/en";

import { Media } from "./payload/collections/Media";
import { Posts } from "./payload/collections/Posts";

import { seoPlugin } from "@payloadcms/plugin-seo";

import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
  FixedToolbarFeature,
  BlocksFeature,
  UnderlineFeature,
  BoldFeature,
  ItalicFeature,
  LinkFeature,
} from "@payloadcms/richtext-lexical";

import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { Post } from "@/payload-types";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const generateTitle: GenerateTitle<Post> = ({ doc }) => {
  return doc?.title ? `${doc.title}` : "Jeeho Ahn";
};

const generateURL: GenerateURL<Post> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${doc.slug}`
    : (process.env.NEXT_PUBLIC_SERVER_URL as string);
};

//import { slateEditor } from '@payloadcms/richtext-slate'
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import Users from "./payload/collections/Users";
import Categories from "./payload/collections/Categories";

export default buildConfig({
  //editor: slateEditor({}),
  graphQL: {
    disablePlaygroundInProduction: true,
  },

  collections: [Posts, Media, Categories, Users],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        LinkFeature({
          enabledCollections: ["posts"],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ("name" in field && field.name === "url") return false;
              return true;
            });

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: "url",
                type: "text",
                admin: {
                  condition: ({ linkType }) => linkType !== "internal",
                },
                label: ({ t }) => t("fields:enterURL"),
                required: true,
              },
            ];
          },
        }),
      ];
    },
  }),

  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { en },
  },

  sharp,
  plugins: [
    seoPlugin({
      generateTitle,
      generateURL,
    }),
  ],
});
