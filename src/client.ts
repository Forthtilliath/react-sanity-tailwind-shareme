import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2022-09-18',
  /**
   * If true, use the CDN-distributed, cached API,
   * else if false, the live, uncached API
   **/
  useCdn: false,
  token: process.env.REACT_APP_SANITY_TOKEN,
  // https://www.sanity.io/help/js-client-browser-token
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
