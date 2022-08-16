import * as React from "react";

export function User({userId, username, email, contact,deleteButton}) {

  return (
    <div className="user-container">
      <p> <span className="bold">UserId</span>: {userId}</p>
      <p> <span className="bold">Email</span>: {email}</p>
      <p> <span className="bold">Username</span>: {username}</p>
      <p> <span className="bold">Contact</span>: {contact}</p>
      {deleteButton}
    </div>
  );
}
