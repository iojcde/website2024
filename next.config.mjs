// @ts-check
import withPlaiceholder from "@plaiceholder/next";
import { withPayload } from '@payloadcms/next/withPayload'
 
/**
 * @type {import('next').NextConfig}
 */
const config = {images:{
  remotePatterns:[{
    protocol: 'https',
    hostname:'cdn.jcde.xyz',
    pathname:'/u/*'
  },{
    protocol: 'https',
    hostname:'rauno.me'
  }]
}
};
 
export default withPayload(withPlaiceholder(config));