import "server-only";

import { defineLive } from "next-sanity";
import { client } from './client'
import { token } from "../env";

export const { sanityFetch, SanityLive } = defineLive({ 
  client: client.withConfig({ 
    // Live content is currently only available on the experimental API
    // https://www.sanity.io/docs/api-versioning
    apiVersion: 'vX' 
  }),
  browserToken:token,
  serverToken: token, 
});
