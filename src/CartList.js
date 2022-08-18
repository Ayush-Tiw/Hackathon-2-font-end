import * as React from "react";
import { useEffect,useState,useContext, createContext} from "react";
import { API } from "./global";
import { Cart } from "./Cart";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {NavBar} from "./NavBar"
import { containerClasses } from "@mui/system";
import TextField from '@mui/material/TextField';
import { usePaymentInputs } from 'react-payment-inputs';
import GooglePayButton from '@google-pay/button-react';


import StripeCheckout from 'react-stripe-checkout';
import { TableBody } from "@mui/material";
import {cartCtx} from "./App";
import { ToastContainer, toast } from 'react-toastify';
import { userCtx } from "./App";





export const cartLengthCtx = createContext();
export function CartList() {

  const[cartValue, setCartValue]=useContext(cartCtx)
  const[carts,setCarts]=useState([])
  const [user, setUser] = useContext(userCtx);

 
  
  const navigate = useNavigate();

  console.log(user);

 const usercart= carts.filter((cart)=>
 {return cart.userId===user._id})
console.log(usercart)

// const [cartLength,setCartLength]=useState(usercart.length)
// console.log(cartLength)

  const getItems=()=>{
    fetch(`${API}/cart`)
    .then((data)=>data.json())
    .then((cart)=>setCarts(cart))
  }

  // console.log(carts.length)
  

  useEffect(() => {
    getItems()
  }, []);

  function setCart(){
    
    
  }

  const deleteItem=(id)=> {
    //after delete we refresh the data
    
    fetch(
        `${API}/cart/${id}`,
       {
         method:"DELETE"
        })
        .then(()=>getItems())
        .then(()=>navigate("/cartList"));

        
      }

let result=usercart.reduce((arr,cart)=>{
let total=cart.quantity*cart.price
arr.push(total)
return arr
    },[])
    console.log(result)

    let totalPrice=result.reduce((total,n)=>{
      return total+=n
    },0)
console.log(totalPrice)



const [product]=useState({
  price:totalPrice
})

// payment

async function  handleToken(token,product){



  fetch(
            `${API}/cart`,
           {
             method:"DELETE"
            }).then(()=>navigate("/order-placed"));

            // create a order placed page

// function checkout(res){

  

//   console.log(res)

//   if(res.status===200){
//     toast('Payment is completed', {
//       position: "top-center",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       },{type:"success"});

//       fetch(
//         `${API}/cart`,
//        {
//          method:"DELETE"
//         }).then(()=>getItems());

//   }else{
//     toast.error('Failure,Payment is not completed', {
//       position: "top-center",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       },{type:"error"});
//   }

// }
// const data={
//   token:token,
//   product:product
// }

 
// await fetch(`${API}/orders`,
// {
//   method:"POST",
//   body:JSON.stringify({token,product}),
//   header:{
//     'content-type':'application/json'
//   }
// }).then((response)=>checkout(response))


    }
    

  return (
    <div>
      <NavBar/>
    <div className="cart-list-container">
      <p className="total-item">Total items : <span className="green">{usercart.length}</span></p>
{usercart.map((cart)=><Cart  name={cart.name}  image={cart.image} price={cart.price} quantity={cart.quantity} deleteButton={<Button onClick={()=> deleteItem(cart._id)} variant="text">
<IconButton aria-label="delete"  color="error">
        <DeleteIcon />
      </IconButton>
</Button>}
/>)}

    </div>
    <div className="total-price">
    <p>Total Price:<span className="red">₹</span><span className="green">{totalPrice}</span></p>  
      
      <StripeCheckout className="checkout"
stripeKey="pk_test_51LUTLESGF1FrCVyXlctlwjhduHJV4yykGSQbY0L3UyHI142XPzC49rCEazVh0Y5wQLFejrh9pWWx3UZ73rb7zWPs00DnTjsKay"
token={handleToken}
amount={product.price*100}
// name={name}
currency="INR"
billingAddress
shippingAddress

/>
    </div>
    <ToastContainer position="top-center" />
    
    </div>
  );
}



