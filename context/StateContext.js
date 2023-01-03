import React , {createContext,useContext, useState, useEffect} from "react";
import { toast, Toast } from "react-hot-toast";
const Context=createContext();
export const StateContext=({children})=>{
  const [showcart,setshowcart]=useState(false)
  const [cartItem,setcartItem]=useState([])
  const [totalPrice,settotalPrice]=useState(0)
  const [totalQuantity,settotalQuantity]=useState(0)
  const [qty,setqty]=useState(1)
  let foundproduct;
  let index;
  const incQty=()=>{
    setqty((prevqty)=> prevqty+1)
  }
  const decQty=()=>{
    setqty((prevqty)=> {
        
            if(prevqty-1 <1) return 1;
            return prevqty-1;
    
        })
  }
  const onAdd=(product,quantity)=>{
    const checkProductInCart = cartItem.find((item)=> item._id===product._id);
    settotalPrice((prevtotalPrice)=>prevtotalPrice+product.price*quantity);
    settotalQuantity((prevtotalQuantity)=>prevtotalQuantity+quantity);
    if(checkProductInCart){    
        const UpdatedCartItem= cartItem.map((cartProduct)=>{
            if(cartProduct._id ===product._id)return{
                ...cartProduct,
                quantity:cartProduct.quantity+quantity
            }
        })
        setcartItem(UpdatedCartItem);
        
    }
    else{
        product.quantity = quantity;
        setcartItem([...cartItem,{...product}])


    }
    toast.success(`${qty} ${product.name} added to cart.`)
  }
  const toggleCartItemQuantity=(id,value)=>{
     foundproduct=cartItem.find((item)=> item._id === id)
     index = cartItem.findIndex((product)=> product._id === id)
     const newcartItem = cartItem.filter((item)=>item._id !==id)
     if(value==='inc')
     {
        setcartItem([...newcartItem,{...foundproduct,
        quantity:foundproduct.quantity+1}])
        settotalPrice((prevtotalPrice)=>prevtotalPrice+foundproduct.price)
        settotalQuantity((prevtotalQuantity)=> prevtotalQuantity+1)
     }
     else if (value==='dec'){
        if(foundproduct.quantity >1){
            setcartItem([...newcartItem,{...foundproduct,
                quantity:foundproduct.quantity-1}])
                settotalPrice((prevtotalPrice)=>prevtotalPrice-foundproduct.price)
                settotalQuantity((prevtotalQuantity)=> prevtotalQuantity-1)

        }
     }
  }
  const onRemove=(product)=>{
    foundproduct=cartItem.find((item)=> item._id === product._id)
    const newcartItem = cartItem.filter((item)=>item._id !== product._id)
    settotalPrice((prevtotalPrice)=>prevtotalPrice-foundproduct.price * foundproduct.quantity)
    settotalQuantity((prevtotalQuantity)=>prevtotalQuantity-foundproduct.quantity)
    setcartItem(newcartItem)

  }
  return(
    <Context.Provider value={
        {
            showcart,
            setshowcart,
            cartItem,
            totalPrice,
            totalQuantity,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            setcartItem,
            settotalPrice,
            settotalQuantity,

        }
    }>
        {children}
    </Context.Provider>
  )

}
export const useStateContext =()=> useContext(Context);