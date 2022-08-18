import * as React from "react";
import { userCtx } from "./App";
import { useContext} from "react";
import {NavBar} from "./NavBar"

// export function Checkout() {
//  let price=200;
//  let name="zasd"
//   const handleToken=()=>{
//   }
//   return (
//     <div>
// this is checkout page
// <StripeCheckout
// className="center"
// stripeKey="pk_test_51LUTLESGF1FrCVyXlctlwjhduHJV4yykGSQbY0L3UyHI142XPzC49rCEazVh0Y5wQLFejrh9pWWx3UZ73rb7zWPs00DnTjsKay"
// token={handleToken}
// amount={price*100}
// name={name}
// billingAddress
// shippingAddress/>
//     </div>
//   );
// }



export function OrderPlaced() {

  const [user, setUser] = useContext(userCtx);

  return (
    <div>
       <NavBar/>
    <div className="order-place-container">
      <p>Hello {user.username} , Your order will be shortly delivered... </p>
      <h1>Thank You !</h1>
      <h2>✔</h2>
      <p>Please visit again</p>
      {/* <div className="order-placed-button"><button>Home</button>
      <button>logout</button></div> */}

    </div>
    </div>
  );
}
