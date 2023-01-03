import React ,{useRef} from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping, AiOutlineLeft } from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import { toast, Toast } from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
import { UrlFor } from '../lib/client'
import getStripe from '../lib/getStripe'
const Cart = () => {
    const cartRef = useRef();
    const {totalPrice,totalQuantity,cartItem,setshowcart,toggleCartItemQuantity,onRemove}=useStateContext();
    const handleCheckout= async()=>{
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });
    
        if(response.statusCode === 500) return;
        
        const data = await response.json();
    
        toast.loading('Redirecting...');
    
        stripe.redirectToCheckout({ sessionId: data.id });
    }
  return (
    <div className="cart-wrapper" ref={cartRef} >
        <div className="cart-container">
            <button type="button" className="cart-heading" onClick={()=>setshowcart(false)} >
                <AiOutlineLeft/>
                <span className="heading" >Your Cart</span>
                <span className="cart-num-items" >({totalQuantity} Items)</span>
            </button>
            {cartItem.length <1 &&(
                <div className="empty-cart" >
                    <AiOutlineShopping size={150} />
                    <h3>Your Shopping bag is Empty</h3>
                    <Link href="/" >
                    <button type="button" className="btn" onClick={()=>setshowcart(false)} > Continue Shopping </button>
                    </Link>
                </div>
            )}
            <div className="product-container" >
                  {cartItem.length >= 1 && cartItem.map((item,index)=>(
                    <div className="product" key={item._id} >
                        <img src={UrlFor(item?.image[0])} className="cart-product-image" />
                        <div className="item-desc" >
                            <div className="flex top" >
                                <h5>{item.name}</h5>
                                <h4>${item.price}</h4>
                            </div>
                            <div className="flex bottom" >
                                <div>
                                  <p className="quantity-desc">
                                  <span className="minus" onClick={()=>toggleCartItemQuantity(item._id,'dec')} ><AiOutlineMinus/> </span>
                                    <span className="num">{item.quantity} </span>
                                   <span className="plus" onClick={()=>toggleCartItemQuantity(item._id,'inc')} ><AiOutlinePlus/> </span>
                                  </p>
                                </div>
                                <button type="button" className="remove-item" onClick={()=>onRemove(item)} ><TiDeleteOutline/></button>
                            </div>
                        </div>
                    </div>
                  )

                  )}
            </div>
            {cartItem.length>=1&& (
                <div className="cart-bottom" >
                    <div className="total" >
                        <h3>SubTotal:</h3>
                        <h3>${totalPrice}</h3>
                    </div>
                    <div className="btn-container" >
                        <button type="button" onClick={handleCheckout} className="btn" > Pay With Stripe </button>

                    </div>
                </div>
            )}
        </div>
      
    </div>
  )
}

export default Cart
