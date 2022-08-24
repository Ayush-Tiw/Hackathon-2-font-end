import * as React from "react";
import {useState,useEffect,useContext} from "react"
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import { API } from "./global";
import { Login } from "./Login.js";

import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {modeCtx} from "./App";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import { ToastContainer, toast } from 'react-toastify';


const signupValidationSchema=Yup.object({
  username:Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  mobNumber:Yup.number().required("Required").min(10,"Mobile number is not correct"),
  password: Yup.string().required("Required").min(8,"password minimum length should be of 8 characters").max(12,'password maximum length should not exceed 12')
})


export function Signup() {
  
  const[moDe,setMoDe]=useContext(modeCtx)
  const navigate=useNavigate()

  const AddUser=(User)=>{
const signUp=(res)=>{
console.log(res)
if(res.message==="Email already exist"){
  toast.error('Email already exist', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}else{
  toast.error('Registered Successfully', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  navigate("/")
}

}

console.log(User)
    fetch(
      `${API}/users/signup`,
    {
      method:"POST",
      body:JSON.stringify(User),
      headers:{
        'content-Type':'application/json',
      },
    }).then((data)=>data.json())
    .then((response)=>signUp(response))
    // .then((response)=>signUp(response))
    
    

 }

  

  const{handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
    initialValues:{
      username:"",
      email:"",
      mobNumber:"",
      password:"",
    },
    validationSchema:signupValidationSchema,
    onSubmit:(newUser)=>{
console.log("onSubmit",newUser);
AddUser(newUser);

    }
})
  
  return (
    <form className="signup-container" onSubmit={handleSubmit}>
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
          

         
          <Button variant="text" onClick={()=>navigate("/")}>
            <IconButton color="primary" aria-label="info">
              <LoginIcon />
            </IconButton>
            Login
          </Button>
          

          
          <Button color="primary" startIcon={moDe === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} onClick={()=>setMoDe( moDe==="light" ?"dark":"light")}>{moDe==="light"?"Dark":"light"} mode </Button>
        </div>
          </nav>
       
    <div className="signup-main-content">
       
      <div className="side-image">
      <img
          className="signup-logo-image"
          src="https://webstockreview.net/images/clipart-restaurant-restaurant-logo-13.png"
          alt="restaurant-logo"
        />
      </div>
      <div className="signup-main-container">
        <div className="signup-intro">
          <h2 className="signup-heading">SIGN UP</h2>
        </div>
        <div className="signup-input">
          <TextField sx={{ marginBottom: "10px" }} id="outlined" label="Enter your Name" type="text" name="username" value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username  && errors.username} 
            helperText={touched.username  && errors.username ? errors.username : ""} />
          <br></br>
          <TextField sx={{ marginBottom: "10px" }} id="outlined" label="Enter your Email" type="email" name="email" value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email  && errors.email} 
            helperText={touched.email  && errors.email ? errors.email : ""} />
        <br></br>
        <TextField sx={{ marginBottom: "10px" }} id="outlined" label="Mobile Number" type="number" name="mobNumber" value={values.mobNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mobNumber  && errors.mobNumber} 
            helperText={touched.mobNumber  && errors.mobNumber ? errors.mobNumber : ""} />
         <br></br>
         <TextField sx={{ marginBottom: "10px" }} id="outlined" label="Password" type="password" name="password" value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password  && errors.password} 
            helperText={touched.password  && errors.password ? errors.password : ""} />
         <br></br>
            {/* <TextField sx={{ marginBottom: "10px" }}  id="outlined" label="re-enter Password" type="password"
            autoComplete="current-password" onChange={(event)=>setRePassword(event.target.value)} /> */}
            <br></br>
          <Button variant="contained" type="submit" color="primary" >Sign Up</Button>
          {/* <p>Already have an account ? <Button onClick={() => navigate("/")}>Log In</Button>  </p> */}
        </div>

      </div>
    </div>
    <ToastContainer position="top-center" />
    </form>
  );
}