import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import {useFormik} from "formik";
import {Navbar} from "./navbar2"
import * as yup from 'yup';
import { API } from './global';


const productValidationSchema= yup.object({
        image:yup.string().required("Required").min(5,"Need bigger Poster"),
        name:yup.string().required("Required"),
        price:yup.number().required("Required").min(50),
        summary:yup.string().required("Required").min(20,"Need bigger summary"),
})
// export function AddMovie({ movieList, setMovieList }) {
   
    export function EditProduct() {

        const { id } = useParams();
        const[product,setProduct]=useState(null)

        const navigate=useNavigate()
    

        const getProduct=()=>{
            fetch(
                `${API}/foods/${id}`
                ).then((data)=>data.json()) 
                .then((pr)=>setProduct(pr))
        }

        useEffect(()=>getProduct(),[])
       
  
    


    return product ? <EditProductForm  product={product}/>:"Loading..."
}

function EditProductForm({product}){
console.log(product)
    const navigate=useNavigate()

    const editProduct = (product) => {
        console.log(product)

       
  
    };

    const {handleSubmit,values,handleChange,handleBlur,touched,errors}=useFormik({
        initialValues:{
        image:product.image,
        name:product.name,
        price:product.price,
        summary:product.summary},
        validationSchema:productValidationSchema,
        onSubmit:(Product)=>{
            console.log("onSubmit",Product);
            fetch(
                `${API}/foods/${product._id}`,
               {
                 method:"PUT",
                 body:JSON.stringify(Product),
                 headers:{
                    'content-Type':'application/json',
                 },
                }).then((data)=>data.json()) 
                .then(()=>navigate("/product-list"))
        }
    })
    console.log(values)
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
            
                <Button type="submit" variant="outlined" >SAVE</Button>
                <div>
                   
                </div>

            
        </form>
        </div>
    );
}