import path from "path";
// import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from "payload/i18n/en";

import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";

//import { slateEditor } from '@payloadcms/richtext-slate'
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  //editor: slateEditor({}),
  editor: lexicalEditor(),
  collections: [
    {
      slug: "users",
      auth: true,
      access: {
        delete: () => false,
        update: () => false,
      },
      fields: [],
    },
    {
      slug: "posts",
      versions: {
        drafts: true,
      },
      admin: {
        useAsTitle: "title",
      },
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "content",
          type: "richText",
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              // The HTMLConverter Feature is the feature which manages the HTML serializers.
              // If you do not pass any arguments to it, it will use the default serializers.
              HTMLConverterFeature({}),
            ],
          }),
        },
        lexicalHTML("content", { name: "content_html" }),
      ],
    },
    {
      slug: "media",
      upload: true,
      fields: [
        {
          name: "alt",
          type: "text",
        },
      ],
    },
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // db: postgresAdapter({
  //   pool: {
  //     connectionString: process.env.POSTGRES_URI || ''
  //   }
  // }),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),

  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { en },
  },

  // admin: {
  //   autoLogin: {
  //     email: "dev@payloadcms.com",
  //     password: "test",
  //     prefillOnly: true,
  //   },
  // },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
});
