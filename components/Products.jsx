import React from 'react'
import Link from 'next/link'
import { UrlFor } from '../lib/client'
const Products = ({product:{image,name,slug,price}}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`} >
        <div className="product-card" >
         <img src={UrlFor(image && image[0])} width={250} height={250} className="product-image" alt="product"/>
         <p className="product-name" >{name}</p>
         <p className="product-price" >${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Products
