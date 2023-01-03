import React , {useState}from 'react'
import { client } from '../../lib/client'
import { UrlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Products } from '../../components'
import {useStateContext} from '../../context/StateContext'
const ProductDetails = ({products,product}) => {
  const {image,name,details,price}=products;
  const[index,setindex]=useState(0);
  const {decQty, incQty,qty,onAdd,setshowcart}=useStateContext()
    const handleBuyNow=()=>{
      onAdd(products,qty);
      setshowcart(true);
    }
    return (
    <div>
      <div className="product-detail-container" >
        <div>
            <div className="image-container" >
             <img src={UrlFor(image && image[index])} className="product-detail-image"/>
            </div>
            <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={UrlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setindex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc" >
           <h1>{name}</h1>
           <div className="reviews">
            <div>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiOutlineStar/>
            </div>
            <p>(20)</p>
           </div>
           <h4>Details</h4>
           <p>{details}</p>
           <p className="price" >${price}</p>
           <div className="quantity" >
            <h3>Quantity: </h3>
             <p className="quantity-desc">
              <span className="minus" onClick={decQty} ><AiOutlineMinus/> </span>
              <span className="num">{qty} </span>
              <span className="plus" onClick={incQty} ><AiOutlinePlus/> </span>
               </p>
           </div>
           <div className="buttons" >
            <button type="button" className="add-to-cart" onClick={()=>onAdd(products,qty)}>Add to Cart </button>
            <button type="button" className="buy-now" onClick={handleBuyNow} >Buy Now </button>
           </div>
        </div>
      </div>
      <div className="maylike-products-wrapper" >
        <h2>You may also like</h2>
        <div className="marquee" >
          <div className="maylike-products-container track" >
              {product.map((item)=>{
                return(
                  <Products key={item._id} product={item} />
                )
              })}

          </div>

        </div>
      </div>
    </div>
  )
}
export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;
  
    const products = await client.fetch(query);
  
    const paths = products.map((product) => ({
      params: { 
        slug: product.slug.current
      }
    }));
  
    return {
      paths,
      fallback: 'blocking'
    }
  }
export const getStaticProps= async({params:{slug}})=>{
    const query = `*[_type == "product" && slug.current=='${slug}'][0]`
    const productsquery = '*[_type =="product"]'
    const products = await client.fetch(query)
    const product = await client.fetch(productsquery)
  
    console.log(products)
    return{
      props:{products,product} 
    }
  }

export default ProductDetails
