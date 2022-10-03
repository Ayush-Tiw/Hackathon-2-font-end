import * as React from "react";
import { useEffect,useState,useContext, createContext} from "react";
import { API } from "./global";
import { Cart } from "./Cart";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {NavBar} from "./NavBar"
import StripeCheckout from 'react-stripe-checkout';
import {cartCtx} from "./App";
import { ToastContainer, toast } from 'react-toastify';
import { userCtx } from "./App";





export const cartLengthCtx = createContext();
export function CartList() {


  const[carts,setCarts]=useState([])
  const [user, setUser] = useContext(userCtx);

 
  
  const navigate = useNavigate();

  console.log(user);

 const usercart= carts.filter((cart)=>
 {return cart.userId===user._id})
console.log(usercart)



  const getItems=()=>{
    fetch(`${API}/cart`)
    .then((data)=>data.json())
    .then((cart)=>setCarts(cart))
  }

  useEffect(() => {
    getItems()
  }, []);


  const deleteItem=(id)=> {
    //after delete we refresh the data
    
    fetch(
        `${API}/cart/${id}`,
       {
         method:"DELETE",
         headers:{
          "x-auth-token":localStorage.getItem("token")
         }
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

let totalQuantity=usercart.filter((cart)=>{
  let arr=[]
let name=cart.name * cart.quantity
console.log(`${cart.name} * ${cart.quantity}`)
arr.push(`${cart.name} * ${cart.quantity}`)
console.log(arr)
return arr
})
console.log(totalQuantity)


let b=usercart.map((cart)=>{

  let a=""
  a=a+`${cart.name} * ${cart.quantity}`
  return a

})
console.log(b)


// const [product,setProduct]=useState({
//   name:"payment checkout",
//   price:`${totalPrice}`,
//   productBy:"Food Zone"
// })

// payment
const product={
  name:"payment checkout",
  price:totalPrice,
  productBy:"Food Zone"
}

async function  handleToken(token){



  console.log(token)
  console.log(user._id)
console.log(token.email)
console.log(product)

const data={
  token:token,
  product:product,
userId:user._id
}
console.log(data)
const headers={
  "Content-Type":"application/json"
}

fetch(`${API}/payment`,{
  method:"POST",
  body:JSON.stringify(data),
  headers
}).then(()=>{
  fetch(
    `${API}/cart`,
   {
     method:"DELETE"
    }).then(()=>navigate("/order-placed"));
})

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
      
      <StripeCheckout 
stripeKey="pk_test_51LUTLESGF1FrCVyXlctlwjhduHJV4yykGSQbY0L3UyHI142XPzC49rCEazVh0Y5wQLFejrh9pWWx3UZ73rb7zWPs00DnTjsKay"
token={handleToken}
amount={product.price*100}
name="FOOD ZONE"
currency="INR"
billingAddress
shippingAddress

>
  <button className="checkout">Checkout</button>
</StripeCheckout>
    </div>
    <ToastContainer position="top-center" />
    
    </div>
  );
}



