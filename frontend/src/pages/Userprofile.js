import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/UserProfileCard.css'; 

const UserProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData && userData !== "undefined") {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleEdit = () => alert("Edit profile clicked!");
  const handleDelete = () => alert("Delete profile clicked!");

  return (
    <>
      <Navbar />
      <div className="card">
        <div className="card__img">
          <img
            src={user.avatar || "https://i.ibb.co/4pDNDk1/avatar.png"} // default avatar fallback
            alt="avatar"
            className="avatar"
          />
        </div>
        <div className="card__body">
          <h2>{user.firstName} {user.lastName}</h2>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user._id || 'N/A'}</p>

          <div className="card__buttons">
            <button className="btn-outline" onClick={handleEdit}>Edit</button>
            <button className="btn-solid" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
