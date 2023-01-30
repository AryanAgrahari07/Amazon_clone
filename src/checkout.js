import React from 'react'
import "./checkout.css"
import Subtotal from './subtotal';
import CheckoutProduct from './checkoutProduct';
import { useStateValue } from './StateProvider';
// import { toUnitless } from '@mui/material/styles/cssUtils';

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className='checkout'>
        <div className='checkout_left'>
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        

        <div>
        <h2 className="checkout__title">Your shopping Basket</h2>
        {basket.map(item => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
      
        </div>
        </div>
        <div className=''>
            <Subtotal/>
            {/* <h1>The subtotal goes Here</h1> */}
        </div>
       
    </div>
  )
}

export default Checkout;