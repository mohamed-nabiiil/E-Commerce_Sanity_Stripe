import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import Cart from './Cart'
import { useStateContext } from '../context/StateContext'
const NavBar = () => {
  const {showcart,setshowcart,totalQuantity}=useStateContext();
  return (
    <div className="navbar-container" >
      <p className="logo">
        <Link href="/" >
          M.N HeadPhones
        </Link>
      </p>
      <button type="button" className="cart-icon" onClick={()=>setshowcart(true)} >
         <AiOutlineShopping/>
         <span className="cart-item-qty" >{totalQuantity}</span>
      </button>
       {showcart &&<Cart/>}
    </div>
  )
}

export default NavBar
