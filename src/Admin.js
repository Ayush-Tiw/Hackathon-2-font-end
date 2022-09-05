import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {useFormik} from "formik";
import * as yup from 'yup';
import TextField from "@mui/material/TextField";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useState, useEffect ,useContext} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from "react-router-dom";
import { API } from "./global";
import {modeCtx,userCtx} from "./App"
import {Navbar} from "./navbar2"



const adminValidationSchema=yup.object({
  email:yup.string().email().required("Required"),
  password:yup.string().required("Required")
})
export function Admin() {
  const [moDe, setMoDe] = useContext(modeCtx);
 const navigate= useNavigate();

  const adminUser=(admin)=>{
console.log(admin)
    function adminCheck(res){
      console.log(res.message)
if(res.message==="You are not an admin"){
  toast.error('You are not an admin', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}else{
  if(res.message==="succesfull login"){
    navigate("/admin-dashboard")
  }else{
    toast.error('invalid credentials', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
}
    }
        
    
      fetch(`${API}/admin/login`, {
        method: "POST",
        body: JSON.stringify(admin),
        headers: {
          "content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then((response) => adminCheck(response));
   
  };

  
  const{handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
    initialValues:{
        email:"",
        password:"",
    },
    validationSchema:adminValidationSchema,
    onSubmit:(admin)=>{
console.log("onSubmit",admin);
adminUser(admin);

    }
})
  return (
    <div>
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

          
        <Button color="primary" onClick={()=>navigate("/")}>user </Button>
          
          <Button color="primary" startIcon={moDe === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} onClick={()=>setMoDe( moDe==="light" ?"dark":"light")}>{moDe==="light"?"Dark":"light"} mode </Button>
        </div>
          </nav> 
     {/* <Navbar/> */}
    <form onSubmit={handleSubmit} className="admin-container">
     
 
<div className="admin-side-image">
<img
          className="admin--logo-image"
          src="https://webstockreview.net/images/clipart-restaurant-restaurant-logo-13.png"
          alt="restaurant-logo"
        />
</div>
<div className="admin-main-container">
        <div className="admin-intro">
          <h2 className="admin-heading">Admin</h2>
          <h3>Log In</h3>
        </div>
        <div className="admin-input">
          <TextField
            sx={{ marginBottom: "10px" }}
            id="outlined"
            label="Email"
            name="email"
            value={values.email}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email  && errors.email} 
            helperText={touched.email  && errors.poster ? errors.email : ""}
          />
          
          
          <br></br>
          <TextField
            sx={{ marginBottom: "10px" }}
            id="outlined"
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password  && errors.password} 
            helperText={touched.password  && errors.password ? errors.password : ""}
          />
          <br></br>
          
         
          <Button type="submit" variant="contained" color="primary" >
            LOG IN
          </Button>
         
        </div>
        <ToastContainer position="top-center" />
      </div>

    </form>
    </div>
  );
}


export function AdminDashboard(){

  const navigate=useNavigate()
  

  function user(){

  }

  return(
<div className="admin-dashboard">

          <Navbar/>
    <div className="dashboard">
      <h3>Admin Dashboard</h3>
    <div className="dashborad-container">
      
      
      <div className="products">
        <h3>Products</h3>
        <button  className="admin-button" onClick={()=>navigate('/product-list')}>View</button>
      </div>
<div className="users">
<h3>Users</h3>
        <button  className="admin-button" onClick={()=>navigate('/user-list')} >View</button>
</div>
{/* <div className="orders">
<h3>Orders</h3>
        <button  className="admin-button">View</button>
</div> */}
    </div>
    </div>
    </div>
  )
}


export function Order(){

  return(
    <div>

    </div>
  )
}

export function OrderList(){

  return(
    <div>
      
    </div>
  )
}