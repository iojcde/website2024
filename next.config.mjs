// @ts-check
import withPlaiceholder from "@plaiceholder/next";
import { withPayload } from "@payloadcms/next/withPayload";
 

/**
 * @type {import('next').NextConfig}
 */
const config = {
  images: {
    remotePatterns: [
      
      {
        protocol: "https"  ,
        hostname: "cdn.jcde.xyz",
        pathname: "/u/*",
      },
    ],
  }, 
};

export default withPlaiceholder(withPayload(config));
