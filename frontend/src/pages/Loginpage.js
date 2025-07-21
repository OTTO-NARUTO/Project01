import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthPage.css'; // Make sure this exists and styles are updated

function Loginpage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      const user = response.data.user;

      if (user && user.id) {
        // Save only necessary user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }));

        alert('Login successful!');
        navigate('/dashboard/userprofile');
      } else {
        alert('Login failed: Invalid response from server.');
        console.error('User object missing ID or data:', user);
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid email or password.');
      } else {
        alert('Server error. Please try again later.');
        console.error('Login error:', error);
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>LOGIN</h2>
        <p>Please enter your login and password!</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="forgot-password">Forgot password?</div>

          <button type="submit" className="auth-btn">LOGIN</button>
        </form>
        <div className="switch-page">
          Don’t have an account? <span onClick={() => navigate('/register')}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
