import * as React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userCtx } from "./App";
import { API } from './global';
import { useState,useEffect } from "react";
import {NavBar} from "./NavBar"



export function Profile() {

  const [user, setUser] = useContext(userCtx);
const navigate=useNavigate();

const[profile,setProfile]=useState({})

// get user by id

const getProfile=()=>{
  fetch(
      `${API}/user/${user._id}`
      ).then((data)=>data.json()) 
      .then((pr)=>setProfile(pr))
}

useEffect(()=>getProfile(),[])
  // console.log(profile)
  return (
    <div className="profile-container">
      {/* this is profile page {user.email} */}
      <NavBar/>
      <div className="profile-name">
      <h2>{profile.username}</h2>
      </div>
      <div className="profile-details">
        <p className="grey">Full Name</p>
        <p className="black-bold">{profile.username}</p> 
        <p className="grey">Email</p>
        <p className="black-bold">{profile.email}</p>
        <p className="grey">Contact Number</p>
        <p className="black-bold">{profile.mobNumber}</p></div>
        <div className="profile-edit">
        <button onClick={()=>navigate(`/profile/edit/${user._id}`)}>Edit Profile</button>
        </div>

    </div>
  );
}


