// @ts-check
import withPlaiceholder from "@plaiceholder/next";
import { withPayload } from "@payloadcms/next/withPayload";

const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}` ||
  "http://localhost:3000";

/**
 * @type {import('next').NextConfig}
 */
const config = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", "")  ,
        };
      }),
      {
        protocol: "https"  ,
        hostname: "cdn.jcde.xyz",
        pathname: "/u/*",
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
};

export default withPlaiceholder(withPayload(config));
