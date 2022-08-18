import * as React from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useParams,
} from "react-router-dom";
import { API } from "./global";
import { useEffect, useState,useContext } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import { Cart } from "./Cart";
import {cartCtx} from "./App"
import { userCtx } from "./App";
import {NavBar} from "./NavBar"

export function OrderDetails() {
  const [food, setFood] = useState({});
  const [restro, setRetro] = useState({});
  
  const [cartItem, setCartItem] = useState({});


  const[cartValue, setCartValue]=useContext(cartCtx)
  const[quantity,setQuantity]=useState(1)
  const [user, setUser] = useContext(userCtx);
  // const [userOrdering,setUserOrdering]=useState({})


  // get user
  // const getUser=()=>{
  //   fetch(
  //       `${API}/user/${user._id}`
  //       ).then((data)=>data.json()) 
  //       .then((pr)=>setUserOrdering(pr))
  // }
  
  // useEffect(()=>getUser(),[])
  
  

  const increaseCartValue = () => {
    setQuantity(quantity+1)
   
  };
  const decreaseCartValue = () => {
    setQuantity(quantity-1)
  };

  const { id, resId } = useParams();
  useEffect(() => {
    fetch(`${API}/foods/${id}`)
      .then((data) => data.json())
      .then((food) => setFood(food));
  }, []);

  useEffect(() => {
    fetch(`${API}/restaurants/${resId}`)
      .then((data) => data.json())
      .then((restro) => setRetro(restro));
  }, []);
  const[carts,setCarts]=useState([])

  const getItems=()=>{
    fetch(`${API}/cart`)
    .then((data)=>data.json())
    .then((cart)=>setCarts(cart))
  }

  console.log(carts.length)

  useEffect(() => {
    getItems()
  }, []);

    function AddItem(){
     function order(response){
      if(response.message==="item already exist"){
        navigate("/cartList")
      }else{
        navigate("/explore")
        getItems()
        console.log(response)
      }

     }

    const cartItem = {
      name: food.name,
      image: food.image,
      price: food.price,
      quantity:quantity,
      userId:user._id,
    };

    
    
      fetch(`${API}/cart`, {
        method: "POST",
        body: JSON.stringify(cartItem),
        headers: {
          "content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        // .then(()=>navigate("/explore"))
        .then((res) => order(res));
    ;
   
  };

  const navigate = useNavigate();
  return (
    <div className="order-container">
      <NavBar/>
      <div className="order-details">
        <div className="ordering-restro">
          <h2>{restro.name}</h2>
          <img
            src="https://th.bing.com/th/id/OIP.7kbL5rEcW83tTAWN02oV8gHaHa?pid=ImgDet&w=640&h=640&rs=1"
            alt={restro.name}
          />
        </div>
        <div className="ordering-food">
          <img src={food.image} alt={food.name} />
          <div className="ordering-food-details">
            <h4>{food.name}</h4>
            
            <div>
              <button onClick={() => increaseCartValue()}>+</button>
              {quantity}
              {/* <Quantity/> */}
              <button onClick={() => decreaseCartValue()}>-</button>
            </div>
            <p>
              <span className="red">₹</span>
              {food.price}
            </p>
          </div>
          <div className="action-button">
            {/* <button className="add-to-cart-button" onClick={()=>setCartValue(cartValue+1)}>Add to cart</button> */}
            <button className="add-to-cart-button" onClick={() => AddItem()}>
              Add to cart
            </button>
            
          </div>
        </div>
      </div>
    
    </div>
  );
}