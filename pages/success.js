import React ,{useState, useEffect} from 'react'
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const {setcartItem, settotalPrice, settotalQuantity}=useStateContext();

useEffect(()=>{
    localStorage.clear();
    setcartItem([]);
    settotalPrice(0);
    settotalQuantity(0);
    runFireworks();

},[])

    return (
    <div className="success-wrapper" >
        <div className="success" >
            <p className="icon" >
              <BsBagCheckFill/>
            </p>
            <h2>Thank You for Your Order!</h2>
            <p className="email-msg" >
                Check your email inbox for the receipt.
            </p>
            <p className="description" >
                if you Have any questions, please email
                <a className="email" href="mailto:order@example.com" >order@example.com</a>
            </p>
            <Link href="/" >
                <button type="button" className="btn" width="300px" >
                    Continue Shopping

                </button>
            </Link>

        </div>
      
    </div>
  )
}

export default Success