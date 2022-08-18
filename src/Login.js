import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useState, useEffect ,useContext} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useFormik} from "formik";
import * as yup from 'yup';
import TextField from "@mui/material/TextField";
import {  useNavigate } from "react-router-dom";
import { API } from "./global";
import {modeCtx,userCtx} from "./App"


const loginValidationSchema=yup.object({
    email: yup.string().email().required("Required"),
    password: yup.string().required("Required")
})


export function Login(){

    const navigate = useNavigate();
    const[user, setUser]=useContext(userCtx)
    const [moDe, setMoDe] = useContext(modeCtx);
    // const [user1,setUser1]=useState({})

    function userDetails(res){
    console.log((res));
    setUser(res)


    }

    const loginUser = (User) => {
      console.log(User)
        const login = (res) => {

          console.log(res.message);
         
          // console.log(res.user._id)
          
          if (res.message === "User does not exist") {
            toast.error('User not found', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
            
          } else {
            if (res.message === "succesfull login") {

              navigate("/explore")

              fetch(`${API}/user/${res.user._id}`)
              .then((data)=>data.json())
              .then((response)=>userDetails(response))

            } else {
              toast.error('Invalid Credentials', {
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
        };
    
        
    
      
          fetch(`${API}/users/login`, {
            method: "POST",
            body: JSON.stringify(User),
            headers: {
              "content-Type": "application/json",
            },
          })
            .then((data) => data.json())
            .then((response) => login(response));
       
      };

    const{handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema:loginValidationSchema,
        onSubmit:(existingUser)=>{
console.log("onSubmit",existingUser);
loginUser(existingUser);


        }
    })

    

    return(
        <form className="login-container" onSubmit={handleSubmit}  >
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
          

         
          <Button variant="text" onClick={()=>navigate("/users/signup")}>
            <IconButton color="primary" aria-label="info">
              <AppRegistrationIcon />
            </IconButton>
            signup
          </Button>
          

          
          <Button color="primary" startIcon={moDe === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />} onClick={()=>setMoDe( moDe==="light" ?"dark":"light")}>{moDe==="light"?"Dark":"light"} mode </Button>
        </div>
          </nav>

         <div>{}</div>
          <div className="login-main-content">
<div className="side-image">
<img
          className="login-logo-image"
          src="https://webstockreview.net/images/clipart-restaurant-restaurant-logo-13.png"
          alt="restaurant-logo"
        />
</div>
<div className="login-main-container">
        <div className="login-intro">
          <h2 className="login-heading">LOG IN</h2>
          <p>Welcome back! </p>
        </div>
        <div className="signup-input">
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
          
          {/* <Link  to="/password-reset">Forgot Password ?</Link><br></br><br></br> */}
          <Button type="submit" variant="contained" color="primary" >
            LOG IN
          </Button>
          <p>
            Don't have an account ?{" "}
            <Button onClick={() => navigate("/users/signup")}>signup</Button>{" "}
          </p>
        </div>
      </div>
      <ToastContainer position="top-center" />
</div>

        </form>
    )
}

