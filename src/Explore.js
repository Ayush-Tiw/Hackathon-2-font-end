import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Food, search } from "./Food";
import { API } from "./global";
import { NavBar } from "./NavBar";
export function Explore() {
  const navigate = useNavigate();

  const [foodVisible, setfoodVisible] = useState(8);

  const [restros, setRetros] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`${API}/foods`)
      .then((data) => data.json())
      .then((food) => setFoods(food));
  }, []);

  useEffect(() => {
    fetch(`${API}/restaurants`)
      .then((data) => data.json())
      .then((restro) => setRetros(restro));
  }, []);

  return (
    <div className="explore-container">
      <NavBar />
      <div className="explore-header"></div>
      <br></br>
      <hr></hr>
      <div className="food-items">
        <p>
          Most <span className="red">Popular</span> Food
        </p>
      </div>

      <div className="food-list">
        <div className="food-list-map">
          {foods.slice(0, foodVisible).map((food) => (
            <Food key={food._id} food={food} id={food._id} name={food.name} />
          ))}
        </div>
        <div className="view-all">
          {foodVisible < 12 ? (
            <button
              className="view-button"
              onClick={() => setfoodVisible(foodVisible + 4)}
            >
              View more
            </button>
          ) : (
            <button
              className="view-button"
              onClick={() => setfoodVisible(foodVisible - 4)}
            >
              View less
            </button>
          )}
        </div>
      </div>
      <hr></hr>
      <div className="about-us">
        <h3>About Us</h3>
        <p>
          Founded in 1999 as a food ordering website, Food zone has matured into
          an all-encompassing food delivery hub with an app and more. It is one
          of the{" "}
          <san className="bold"> most popular food ordering apps in India</san>.
          It is also one of the oldest players in the town.
        </p>
        <p>
          The headquarters of the Seamless a top food delivery company is in New
          Delhi, India. Currently, it provides the food delivery and takeout in
          more than 600 cities
        </p>
      </div>
    </div>
  );
}
