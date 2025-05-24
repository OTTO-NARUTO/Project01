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

  // Live password checks
  const isLengthValid = form.password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*]/.test(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLengthValid || !hasSpecialChar) {
      alert("Password must be at least 8 characters and include a special character (!@#$%^&*)");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/users/register', form);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Signup failed.');
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">🔵 Register</h2>

        <div className="name-fields">
          <input
            type="text"
            placeholder="Firstname"
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Lastname"
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

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

        {/* 🔍 Live Password Validation */}
        <div className="password-validation">
          <p style={{ color: isLengthValid ? 'green' : 'red', margin: '4px 0' }}>
            {isLengthValid ? '✅' : '❌'} At least 8 characters
          </p>
          <p style={{ color: hasSpecialChar ? 'green' : 'red', margin: '0 0 10px 0' }}>
            {hasSpecialChar ? '✅' : '❌'} Includes a special character (!@#$%^&*)
          </p>
        </div>

        <button className="submit-btn" type="submit">Submit</button>
        <p className="bottom-link">
          Already have an account? <a href="/login">Signin</a>
        </p>
      </form>
    </div>
  );
}

export default Registerpage;
