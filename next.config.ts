// @ts-check
import withPlaiceholder from "@plaiceholder/next";
import { withPayload } from "@payloadcms/next/withPayload";

const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

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
          protocol: url.protocol.replace(":", "") as "http" | "https",
        };
      }),
      {
        protocol: "https" as "https",
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
