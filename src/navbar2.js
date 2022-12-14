import * as React from "react";
import Button from "@mui/material/Button";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./global";
import { modeCtx, userCtx } from "./App";


export function Navbar() {
  const [moDe, setMoDe] = useContext(modeCtx);

  const navigate = useNavigate();

  return (
    <nav className="login-nav-bar">
      <div className="about-app">
        <img
          className="app-logo"
          src="https://webstockreview.net/images/clipart-restaurant-restaurant-logo-13.png"
          alt="restaurant-logo"
        />
        <h1 className="app-name">FOOD ZONE</h1>
      </div>
      <div className="nav-button">
        <Button color="primary" onClick={() => navigate("/admin-dashboard")}>
          dashboard{" "}
        </Button>

        <Button
          color="primary"
          startIcon={
            moDe === "dark" ? <Brightness7Icon /> : <Brightness4Icon />
          }
          onClick={() => setMoDe(moDe === "light" ? "dark" : "light")}
        >
          {moDe === "light" ? "Dark" : "light"} mode{" "}
        </Button>
        <Button color="primary" onClick={() => navigate("/admin/login")}>
          logout{" "}
        </Button>
      </div>
    </nav>
  );
}
