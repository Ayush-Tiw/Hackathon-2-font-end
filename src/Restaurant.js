import * as React from "react";
import { Routes, Route, Link, Navigate, useNavigate,useParams } from "react-router-dom";

export function Restaurant({ restro,id,resId }) {
    const navigate=useNavigate()

    return (

        <div className="restro-container" onClick={()=>navigate(`/foods/${id}/${resId}`)}>
            <img className="restro-image" src={restro.image} alt={restro.name} />
            <h2 className="restro-name">{restro.name}
            </h2>
            
        </div>
    );
}