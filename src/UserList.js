import * as React from "react";
import { useState, useEffect } from "react";
import { API } from "./global";
import {User} from "./User"
import {Navbar} from "./navbar2"

export function UserList() {

  const [users, setUsers] = useState([]);

  const getUser=()=>{
    fetch(`${API}/users`)
    .then((data) => data.json())
    .then((users) => setUsers(users));
  }

  useEffect(() => {
    getUser()
  }, []);

const deleteUser=(id)=>{
  fetch(
    `${API}/user/${id}`,
   {
     method:"DELETE"
    }).then(()=>getUser())
  }


  return (
    <div className="userlist-container">
      <Navbar/>
      <h4>All User Information</h4>
      
  <div className="user-list">
  {users.map((user)=> <User userId={user._id} username={user.username} email={user.email} contact={user.mobNumber} deleteButton={<button className="user-delete-button" onClick={()=>deleteUser(user._id)}>delete</button>} />)}
  </div>
     
    </div>
  );
}
