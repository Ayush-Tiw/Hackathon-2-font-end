import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { modeCtx, userCtx } from "./App";
import { API } from "./global";
import { Product } from "./Product";
import { Navbar } from "./navbar2";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [moDe, setMoDe] = useContext(modeCtx);

  const getProduct = () => {
    fetch(`${API}/foods`)
      .then((data) => data.json())
      .then((products) => setProducts(products));
  };

  useEffect(() => {
    getProduct();
  }, []);

  // delete product by id
  function deleteProduct(id) {
    fetch(`${API}/food/${id}`, {
      method: "DELETE",
    }).then(() => getProduct());
  }

  // edit product by id
  function editProduct(id) {
    fetch(
      fetch(`${API}/food/${id}`, {
        method: "DELETE",
      }).then(() => getProduct())
    );
  }

  return (
    <div className="product-list-2">
      <Navbar />
      <div className="product-list-container">
        <button
          onClick={() => navigate("/add-product")}
          className="add-product-button"
        >
          Add Product
        </button>

        <div className="product-list">
          {products.map((product) => (
            <Product
              key={product._id}
              image={product.image}
              id={product._id}
              name={product.name}
              price={product.price}
              summary={product.summary}
              deleteButton={
                <button
                  className="admin-delete-button"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              }
              editButton={
                <button
                  className="admin-edit-button"
                  onClick={() => navigate(`/product/edit/${product._id}`)}
                >
                  Edit
                </button>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
