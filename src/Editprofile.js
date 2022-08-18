import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import {useFormik} from "formik";
import {Navbar} from "./navbar2"
import * as yup from 'yup';
import { API } from './global';



const profileValidationSchema= yup.object({
        username:yup.string().required("Required").min(5,"Need bigger Name"),
        email:yup.string().email().required("Required"),
        mobNumber:yup.number().required("Required")
        
})
// export function AddMovie({ movieList, setMovieList }) {
   
    export function EditProfile() {

        const { id } = useParams();
        const[profile,setProfile]=useState(null)

        const navigate=useNavigate()
    

        const getProfile=()=>{
            fetch(
                `${API}/user/${id}`
                ).then((data)=>data.json()) 
                .then((pr)=>setProfile(pr))
        }

        useEffect(()=>getProfile(),[])
       
  
    


    return profile ? <EditProfileForm  profile={profile}/>:"Loading..."
}

function EditProfileForm({profile}){
console.log(profile)
    const navigate=useNavigate()

    const editProfile = (profile) => {
        console.log(profile)
    };

    const {handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
        initialValues:{
        username:profile.username,
        email:profile.email,
        mobNumber:profile.mobNumber,
        password:profile.password
        },
        validationSchema:profileValidationSchema,
        onSubmit:(Profile)=>{
            console.log("onSubmit",Profile);
            fetch(
                `${API}/user/${profile._id}`,
               {
                 method:"PUT",
                 body:JSON.stringify(Profile),
                 headers:{
                    'content-Type':'application/json',
                 },
                }).then((data)=>data.json()) 
                .then(()=>navigate("/profile"))
        }
    })
    console.log(values)
    return (
        <div className="add-product">
         <Navbar/>
            <form onSubmit={handleSubmit} className="add-product-form">
               
                <TextField label="Full Name" variant="standard" 
                // error
                 name="username"
                 value={values.username}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 error={touched.username && errors.username} 
                 helperText={touched.username  && errors.username ? errors.username : ""}/>
                 {/* {touched.poster  && errors.poster ? errors.poster : ""} */}
               
                  {/* {touched.name  && errors.name ? errors.name : ""} */}
                <TextField label="Email" variant="standard" name="email"
                 value={values.email}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 error={touched.email && errors.email} 
                 helperText={touched.email  && errors.email ? errors.email : ""}/>
                 {/* {touched.rating  && errors.rating ? errors.rating : ""} */}
                <TextField label="Conatact Number" variant="standard" name="mobNumber"
                 value={values.mobNumber}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 error={touched.mobNumber && errors.mobNumber}
                 helperText={touched.mobNumber  && errors.mobNumber ? errors.mobNumber: ""}/>
            
                <Button type="submit" variant="outlined" color="success" >SAVE</Button>
                <div>
                   
                </div>

            
        </form>
        </div>
    );
}
