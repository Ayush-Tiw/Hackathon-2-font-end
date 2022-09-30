import { CountertopsOutlined } from "@mui/icons-material";
import * as React from "react";
import { useState, createContext, useEffect } from "react";
export function PreviewImage(){

    const[image,setImage]=useState("");
    const [url,setUrl]=useState("")

const uploadImage=(event)=>{

    console.log(event.target.files[0])

    setImage(event.target.files[0])
    const formData=new FormData();
    formData.append("myFile",image,image.name)
    // formData.append()
    // formData.append("upload_preset", "tbdiuogu")
    // formData.append("cloud_name","dezivsphi")

    fetch("https://api.cloudinary.com/v1_1/dezivsphi/image/upload",{
        method:"POST",
        body:formData
        // headers:{
        //     "Content-Type":"application/json"
        // }
    }).then(res =>res.json()
    ).then((data)=>{
        console.log(data.url)
        setUrl(data.url)
    }).catch(err=>console.log(err))
}

   
    return(
        <div>
           <input type="file" onChange={(event)=>
            uploadImage(event)
          
            }></input>
           {/* <button onClick={uploadImage}> upload</button> */}
           <div>
            <h1>Uploaded image will be displayed here</h1>
            <img src={url}/>
           </div>
        </div>
    )
}