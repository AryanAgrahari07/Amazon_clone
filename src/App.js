// import './App.css';
// import { Header } from "./header";
// import { Home } from "./home";
// import {createBrowserRouter, createRoutesFromElements, Route, Link, RouterProvider} from "react-router-dom";

// export function App() {
 
  
// const router= createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Root/>}>
//     <Route index element={<Home/>} />
//     <Route path='/' element={<Home/>} /> 
//     <Route path='/Header' element={<Header/>} />
//     </Route> 

//     // <Route path='/header' element={<Rot/>}>
//     // {/* <Route index element={<Home/>} /> */}
//     // <Route path='/Header' element={<Header/>} />
//     // </Route> 
//   )
// )
  
// return (
//     <div className="App">
//       {/* <h1>Hi is this working</h1> */}
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// const Root = () =>{
//      return (
//       <>
//       <div>
//         <Link to='/'>{<Header/>} </Link> 
//         <Link to='/'>{<Home/>} </Link> 
//       </div>
//       </>
//      )
//   }
// const Rot = () =>{
//      return (
//       <>
//       <div>
//         <Link to='/'>{<Header/>} </Link> 
//         <Link to='/'>{<Home/>} </Link> 
//       </div>
//       </>
//      )
//   }
 
// export default App;






import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './home'
import Header from './header'
import Checkout from "./checkout";
import Login from "./login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./payment";
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from '@stripe/react-stripe-js'

const promise = loadStripe(
  "pk_test_51MUzqsSEKUT7RsxeoVA87CA4FgeXp22TDlRccE9IYRZLV1gpBwW3nDVOIFjhzaLQ6l0WiKJbVrKL0uy1YZXavk7B000CzUL2tX"
);

function App() {
const [{}, dispatch] = useStateValue();

   useEffect(()=>{
     auth.onAuthStateChanged(authUser =>{
      console.log('THE USER IS >>>', authUser);
      
      if(authUser){
         
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        dispatch({
          type: 'SET_USER',
          user: null  
        })
      }

     })
   }, [])

return (
<Router>
  <div className="app"> 
    <Routes>
        <Route path='/' element={<><Header/><Home/></>} />
        <Route path='/checkout' element={<><Header/><Checkout/></>} />
        <Route path='/login' element={<><Login/></>} />
        <Route path='/payment' element={<><Header/><Elements stripe={promise}><Payment/></Elements></>} />
    </Routes>
  </div>
    </Router>
 );
}

export default App;