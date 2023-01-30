import React, { useEffect, useState } from 'react'
import './payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './checkoutProduct';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from "./firebase";

// function Payment() {
//     const [{ basket, user }, dispatch] = useStateValue();
//     const navigate = useNavigate();

//     const stripe = useStripe();
//     const elements = useElements();

//     const [succeeded, setSucceeded] = useState(false);
//     const [processing, setProcessing] = useState("");

//     const [error, setError] = useState(null);
//     const [disabled, setDisabled] = useState(true);
//     const [clientSecret, setclientSecret] = useState(true);

//     useEffect(() => {
//         const getClientSecret = async () => {
//               const response = await axios({
//                 method: "post",
//                 url: `/payment/create?total=${getBasketTotal(basket) *100} `,
//               });
//               setclientSecret(response.data.clientSecret);
//         };

//         getClientSecret();
//     }, [basket]);
     
//     console.log("[CLIENTSECRET]", clientSecret);

//      const handleSubmit = async (event) => {
//         event.preventDefault();
//         setProcessing(true);

//         const payload = await stripe
//         .confirmCardPayment(clientSecret, {
//           payment_method: {
//             card: elements.getElement(CardElement),
//           },
//           }
//           ).then(({paymentIntent}) => {
//             setSucceeded(true);
//             setError(null);
//             setProcessing(false);

//             navigate('/orders', { replace: true }); 
//           })
//     }

//     const handleChange = (e) => {
//         setDisabled(e.empty);
//         setError(e.error ? e.error.message : "");
//       };
    

function Payment() {
    const navigate = useNavigate();
    const [{ user, basket }, dispatch] = useStateValue();
  
    const stripe = useStripe();
    const elements = useElements();
  
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
  
    useState(() => {
      const getClientSecret = async () => {
        const response = await axios({
          method: "post",
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        setClientSecret(response.data.clientSecret);
      };
  
      getClientSecret();
    }, [basket]);
  
    console.log("[CLIENTSECRET]", clientSecret);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setProcessing(true);
  
      const payload = await stripe
        .confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then(({ paymentIntent }) => {
          // Payment Intent is Payment Confirmation
  
          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });
  
          setSucceeded(true);
          setError(null);
          setProcessing(false);
  
          dispatch({
            type: "EMPTY_BASKET",
          });
  
          navigate('/orders', { replace: true }); 
        });
    };
  
    const handleChange = (e) => {
      setDisabled(e.empty);
      setError(e.error ? e.error.message : "");
    };














    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout (<Link to='/checkout'>{basket?.length} items
                    </Link>)
                </h1>

                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>House no. 224, Ward no. 10, Sleemnabad</p>
                        <p>Jabalpur, MP, 483440</p>
                    </div>
                </div>


                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment_items'>
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


                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} // Part of the homework
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>
                                        {processing ? <p>Processing</p> : "Buy Now"}
                                    </span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>

                </div>




            </div>
        </div>
    )
}

export default Payment