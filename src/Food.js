import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "./global";

export function Food({ food, id }) {
  useEffect(() => {});

  const navigate = useNavigate();

  return (
    <div className="food-container" onClick={() => navigate(`/foods/${id}`)}>
      <img className="food-image" src={food.image} alt={food.name} />
      <h1 className="food-name">{food.name}</h1>
    </div>
  );
}
export const search = ({ name }) => {
  fetch(`${API}/foods/${name}`);
  console.log(name);
};
