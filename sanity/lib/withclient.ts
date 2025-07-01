import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,token } from '../env'

export const withclient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true, 
})

if(!withclient.config().token){
    throw new Error("Sanity client is not configured with a token. Please set the SANITY_API_TOKEN environment variable.");
}