import 'server-only'
import { defineLive } from "next-sanity";
import { client } from './client'
import { token } from '../env';

export const { sanityFetch, SanityLive } = defineLive({ 
  client: client.withConfig({ 
    apiVersion: 'vX'
  }),
  browserToken:token,
  serverToken:token, 
}

);
