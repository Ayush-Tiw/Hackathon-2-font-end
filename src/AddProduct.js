import * as React from "react";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Navbar } from "./navbar2";
import * as yup from "yup";
import { API } from "./global";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const productValidationSchema = yup.object({
  image: yup.string().required("why not fill this field"),
  name: yup.string().required("why not fill this field"),
  price: yup.number().required("why not fill this field").min(10),
  summary: yup
    .string()
    .required("why not fill this field")
    .min(20, "Need bigger summary"),
});

export function AddProduct() {
  const [click, setClick] = useState(true);

  const navigate = useNavigate();

  // cloudinary uplaod
  const formProduct = (product) => {
    console.log(product.image);
    setClick(false);
    const formData = new FormData();
    formData.append("file", product.image);
    formData.append("upload_preset", "tbdiuogu");
    formData.append("cloud_name", "dezivsphi");

    fetch("https://api.cloudinary.com/v1_1/dezivsphi/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        addProduct(data);
      })
      .catch((err) => console.log(err));

    const addProduct = (image) => {
      console.log(image.url);
      const data = {
        image: image.url,
        name: product.name,
        price: product.price,
        summary: product.summary,
      };
      console.log(data);
      fetch(`${API}/foods`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-Type": "application/json",
        },
      })
        .then((data) => data.json())
        .then(() => navigate("/product-list"));
    };
  };

  const { handleSubmit, setFieldValue, values, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        image: "",
        name: "",
        price: "",
        summary: "",
      },
      validationSchema: productValidationSchema,
      onSubmit: (newProduct) => {
        console.log("onSubmit", newProduct);
        formProduct(newProduct);
      },
    });
  return (
    <div className="add-product">
      <Navbar />
      <form onSubmit={handleSubmit} className="add-product-form">
        <TextField
          label="Product Name"
          variant="standard"
          // error
          name="name"
          onChange={(event) => setFieldValue("name", event.target.value)}
          onBlur={handleBlur}
          error={touched.name && errors.name}
          helperText={touched.name && errors.name ? errors.name : ""}
        />

        <TextField
          label="Image URl"
          variant="standard"
          name="image"
          type="file"
          onChange={(event) => setFieldValue("image", event.target.files[0])}
          onBlur={handleBlur}
          error={touched.image && errors.image}
          helperText={touched.image && errors.image ? errors.image : ""}
        ></TextField>
        <TextField
          label="Price"
          variant="standard"
          name="price"
          onChange={(event) => setFieldValue("price", event.target.value)}
          onBlur={handleBlur}
          error={touched.price && errors.price}
          helperText={touched.price && errors.price ? errors.price : ""}
        />
        <TextField
          label="Summary"
          variant="standard"
          name="summary"
          onChange={(event) => setFieldValue("summary", event.target.value)}
          onBlur={handleBlur}
          error={touched.summary && errors.summary}
          helperText={touched.summary && errors.summary ? errors.summary : ""}
        />

        {click ? (
          <div className="add-button">
            <button type="submit">Add Product</button>
          </div>
        ) : (
          <div className="add-button">
            {" "}
            <LoadingButton
              sx={{ color: "white" }}
              loading
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
            >
              Adding
            </LoadingButton>
          </div>
        )}

        <div></div>
      </form>
    </div>
  );
}
