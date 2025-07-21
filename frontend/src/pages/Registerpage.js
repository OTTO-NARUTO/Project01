import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthPage.css';

function Registerpage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const isLengthValid = form.password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*]/.test(form.password);

  const isPasswordInvalid =
    form.password && (!isLengthValid || !hasSpecialChar);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLengthValid || !hasSpecialChar) {
      alert("Password must be at least 8 characters and include a special character (!@#$%^&*)");
      return;
    }

    try {
      // Debug: Log the form before sending
      console.log("Registering with:", form);

      const response = await axios.post('http://localhost:5000/api/users/register', form);

      if (response.status === 201 || response.status === 200) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        alert('Signup failed.');
        console.error("Unexpected status:", response.status);
      }
    } catch (err) {
      alert('Signup failed.');
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>SIGN UP</h2>
        <p>Please enter your details to create an account</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {isPasswordInvalid && (
            <div className="password-validation">
              {!isLengthValid && (
                <p style={{ color: 'red', margin: '4px 0' }}>
                  Password must be at least 8 characters
                </p>
              )}
              {!hasSpecialChar && (
                <p style={{ color: 'red', margin: '0 0 10px 0' }}>
                  Include at least one special character (!@#$%^&*)
                </p>
              )}
            </div>
          )}

          <button type="submit" className="auth-btn">SIGN UP</button>
        </form>
        <div className="switch-page">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </div>
      </div>
    </div>
  );
}

export default Registerpage;
