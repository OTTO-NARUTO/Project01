import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/UserProfileCard.css';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: 'N/A',
    lastName: 'N/A',
    email: 'N/A',
    id: 'N/A',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        // Account for either direct user object or nested under `.user`
        const userData = parsed.user || parsed;

        setUser({
          firstName: userData.firstName || 'N/A',
          lastName: userData.lastName || 'N/A',
          email: userData.email || 'N/A',
          id: userData.id || 'N/A',
        });
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleEdit = async () => {
    alert("Edit clicked! (Functionality coming soon)");
    // Example patch:
    // await axios.put(`http://localhost:5000/api/users/${user.id}`, { firstName: 'UpdatedName' });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${user.id}`);
        localStorage.removeItem("user");
        alert("User deleted.");
        window.location.href = "/register";
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="card">
        <div className="card__img">
          <img
            src={"https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="avatar"
            className="avatar"
          />
        </div>
        <div className="card__body">
          <h2>{user.firstName} {user.lastName}</h2>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user.id}</p>

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
