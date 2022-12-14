import logo from "./logo.svg";
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useState, createContext, useEffect } from "react";
import { Home } from "./Home";
import { Signup } from "./Signup";
import { Explore } from "./Explore";
import { FoodDetails } from "./FoodDetails";
import { OrderDetails } from "./OrderDetails";
import { CartList } from "./CartList";
import { Profile } from "./Profile";
import { Admin, AdminDashboard } from "./Admin";
import "./App.css";
import { UserList } from "./UserList";
import { ProductList } from "./ProductList";
import { AddProduct } from "./AddProduct";
import { EditProduct } from "./EditProduct";
import { EditProfile } from "./Editprofile";
import { OrderPlaced } from "./OrderPlaced";
import { PreviewImage } from "./PreviewImage";

export const modeCtx = createContext();
export const cartCtx = createContext();
export const userCtx = createContext();
function App() {
  const [moDe, setMoDe] = useState("light");
  const [cartValue, setCartValue] = useState(0);
  const [user, setUser] = useState({});

  const theme = createTheme({
    palette: {
      mode: moDe,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={4} style={{ minHeight: "100vh", borderRadius: "0px" }}>
        <modeCtx.Provider value={[moDe, setMoDe]}>
          <cartCtx.Provider value={[cartValue, setCartValue]}>
            <userCtx.Provider value={[user, setUser]}>
              <div className="App-container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/users/signup" element={<Signup />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/foods/:id" element={<FoodDetails />} />z
                  <Route
                    path="/cartList"
                    element={
                      <CartList
                        cartValue={cartValue}
                        setCartValue={setCartValue}
                      />
                    }
                  />
                  <Route path="/foods/:id/:resId" element={<OrderDetails />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin/login" element={<Admin />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/user-list" element={<UserList />} />
                  <Route path="/product-list" element={<ProductList />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/product/edit/:id" element={<EditProduct />} />
                  <Route path="/profile/edit/:id" element={<EditProfile />} />
                  <Route path="/order-placed" element={<OrderPlaced />} />
                  <Route path="/preview" element={<PreviewImage />} />
                </Routes>
              </div>
            </userCtx.Provider>
          </cartCtx.Provider>
        </modeCtx.Provider>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
