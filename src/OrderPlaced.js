import * as React from "react";
import { userCtx } from "./App";
import { useContext } from "react";
import { NavBar } from "./NavBar";

export function OrderPlaced() {
  const [user, setUser] = useContext(userCtx);

  return (
    <div>
      <NavBar />
      <div className="order-place-container">
        <p>Hello {user.username} , Your order will be shortly delivered... </p>
        <h1>Thank You !</h1>
        <h2>✔</h2>
        <p>Please visit again</p>
      </div>
    </div>
  );
}
