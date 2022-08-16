import * as React from "react";
import { useEffect,useState,useContext} from "react";
import {cartCtx} from "./App"


export function Cart({ name,image,price,quantity,id,deleteButton}) {




  return (
    <div className="cart-container">
     
      <div className="cart-item-image">
        <img src={image} alt={name}/>
      </div>
      <div className="cart-item-name">
        <h5>{name}</h5>
        </div>
        <div className="cart-item-quantity">
          <p>Qty:{quantity}</p>
        </div>
        
     
      <div className="item-total-price">
      <span className="red">₹ </span>
      {price*quantity}
      </div>
      <div className="cart-delete-button" >{deleteButton}</div>
    </div>
  );
}