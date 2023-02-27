import {createClient} from '@sanity/client'
import imageURLBuilder from '@sanity/image-url'

export const client = createClient({
    projectId:'3cc9evm5',
    dataset:'production',
    apiVersion:'2023-01-01',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
    ignoreBrowserTokenWarning: true,
})
const builder = imageURLBuilder(client);
export  const UrlFor = (source)=> builder.image(source); 