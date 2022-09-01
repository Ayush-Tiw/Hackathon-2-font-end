
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect, useContext } from "react";
import { API } from "./global";
import { modeCtx } from "./App";
import { userCtx } from "./App";
export function NavBar() {
    const navigate = useNavigate();
    const [carts, setCarts] = useState([]);
    const [moDe, setMoDe] = useContext(modeCtx);
    const [user, setUser] = useContext(userCtx);
  
    const getItems = () => {
      fetch(`${API}/cart`)
        .then((data) => data.json())
        .then((cart) => setCarts(cart));
    };
    useEffect(() => {
      getItems();
    }, []);

    const usercart= carts.filter((cart)=>
 {return cart.userId===user._id})
console.log(usercart)

    return (
        <nav className="Nav-bar">
          <div onClick={() => navigate("/explore")} className="about-app">
            <img
              className="app-logo"
              src="https://webstockreview.net/images/clipart-restaurant-restaurant-logo-13.png"
              alt="restaurant-logo"
            />
            <h1 className="app-name">FOOD ZONE</h1>
          </div>
          <div className="nav-button">
            <Button
              sx={{ color: "red" }}
              onClick={() => navigate("/explore")}
              variant="text"
            >
              <IconButton color="primary" aria-label="info">
                <HomeIcon />
              </IconButton>
            </Button>
            <Button
              color="primary"
              startIcon={
                moDe === "dark" ? <Brightness7Icon /> : <Brightness4Icon />
              }
              onClick={() => setMoDe(moDe === "light" ? "dark" : "light")}
            >
          {moDe==="light"?"Dark":"light"} mode 
            </Button>
    
            <Button variant="text">
              <Badge badgeContent={usercart.length} color="secondary">
                <IconButton
                  color="primary"
                  aria-label="info"
                  onClick={() => navigate("/cartList")}
                >
                  <ShoppingCartIcon />
                </IconButton>
              </Badge>
            </Button>

    
           
            <Button onClick={() => navigate("/")} variant="text">
              {/* <IconButton  aria-label="info">
                <LogoutIcon />
                
              </IconButton> */}
              logout
            </Button>
            <Button onClick={() => navigate("/profile")} variant="text">
              profile
            </Button>
            <Button onClick={() => navigate("/admin/login")} variant="text">
              Admin
            </Button>
            
          </div>
        </nav>
      );
}