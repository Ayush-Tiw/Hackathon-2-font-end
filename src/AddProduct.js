import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik";
import {Navbar} from "./navbar2"
import * as yup from 'yup';
import { API } from './global';


const productValidationSchema= yup.object({
        image:yup.string().required("why not fill this field").min(5,"Need bigger Poster"),
        name:yup.string().required("why not fill this field"),
        price:yup.number().required("why not fill this field").min(10),
        summary:yup.string().required("why not fill this field").min(20,"Need bigger summary"),
})
// export function AddMovie({ movieList, setMovieList }) {
   
    export function AddProduct() {

        const navigate=useNavigate()
    const addProduct = (product) => {
        console.log(product)

        fetch(
            `${API}/foods`,
           {
             method:"POST",
             body:JSON.stringify(product),
             headers:{
                'content-Type':'application/json',
             },
            }).then((data)=>data.json()) 
            .then(()=>navigate("/product-list"))
  
    };

    function chooseFile(e){
        console.log(e.target.files[0])

    }

    const {handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
        initialValues:{
        image:"",
        name:"",
        price:"",
        summary:""},
        validationSchema:productValidationSchema,
        onSubmit:(newProduct)=>{
            console.log("onSubmit",newProduct);
            addProduct(newProduct)
        }
    })
    return (
        <div className="add-product">
         <Navbar/>
            <form onSubmit={handleSubmit} className="add-product-form">
               
                <TextField label="Product Name" variant="standard" 
                // error
                 name="name"
                 value={values.name}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 error={touched.name && errors.name} 
                 helperText={touched.name  && errors.name ? errors.name : ""}/>
                 {/* {touched.poster  && errors.poster ? errors.poster : ""} */}
                <TextField label="Image url" variant="standard"  name="image" 
                 value={values.image}
                 onChange={handleChange}
                 onBlur={handleBlur} 
                 error={touched.image && errors.image} 
                 helperText={touched.image  && errors.image ? errors.image : ""}/>
                  {/* {touched.name  && errors.name ? errors.name : ""} */}
                  {/* <input type="file" onChange={(e)=>chooseFile(e)}></input> */}
                <TextField label="Price" variant="standard" name="price"
                 value={values.price}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 error={touched.price && errors.price} 
                 helperText={touched.price  && errors.price ? errors.price : ""}/>
                 {/* {touched.rating  && errors.rating ? errors.rating : ""} */}
                <TextField label="Summary" variant="standard" name="summary"
                 value={values.summary}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 error={touched.summary && errors.summary}
                 helperText={touched.summary  && errors.summary ? errors.summary : ""}/>
            
                {/* <Button  variant="outlined" value="Upload" ></Button> */}
                <div className="add-button"><button type="submit" >Add Product</button></div>
                <div>
                   
                </div>

            
        </form>
        </div>
    );
}

