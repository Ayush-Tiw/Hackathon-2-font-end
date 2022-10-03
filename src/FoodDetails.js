import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "./global";
import { Restaurant } from "./Restaurant";
import { NavBar } from "./NavBar";

export function FoodDetails() {
  const { id, resId } = useParams();
  const [food, setFood] = useState({});
  const [restros, setRetros] = useState([]);

  useEffect(() => {
    fetch(`${API}/foods/${id}`)
      .then((data) => data.json())
      .then((food) => setFood(food));
  }, []);

  useEffect(() => {
    fetch(`${API}/restaurants`)
      .then((data) => data.json())
      .then((restro) => setRetros(restro));
  }, []);

  const navigate = useNavigate();
  return (
    <div className="food-details">
      {/* welcome to food details page {id} */}
      <NavBar />
      <div className="back-button" onClick={() => navigate(-1)}>
        {/* move to previous page */}
        <IconButton color="primary" aria-label="info">
          <ArrowBackIosIcon />
        </IconButton>
      </div>

      <div className="selected-food">
        <div className="selected-food-image">
          <img src={food.image} alt={food.name} />
        </div>

        <div className="select-restuarant">
          <h3>All restaurants delivering {food.name}</h3>
          <div className="restro-list-map">
            {restros.map((restro) => (
              <Restaurant
                key={restro._id}
                restro={restro}
                id={food._id}
                resId={restro._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
