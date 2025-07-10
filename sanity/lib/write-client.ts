import "server-only";

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,token } from '../env'

export const writeclient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, 
})

if(!writeclient.config().token){
    throw new Error("Sanity client is not configured with a token. Please set the SANITY_API_TOKEN environment variable.");
}