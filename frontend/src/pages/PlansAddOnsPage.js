import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Notification from '../components/Notification';
import '../styles/PlansAddOns.css';

const plans = [
  {
    name: 'Basic',
    price: 500,
    description: 'Perfect for individuals or startups.',
    features: ['1 User', 'Basic Support', 'Access to Dashboard'],
  },
  {
    name: 'Medium',
    price: 1000,
    description: 'Ideal for small teams and growing needs.',
    features: ['5 Users', 'Priority Support', 'Team Collaboration'],
  },
  {
    name: 'Premium',
    price: 1500,
    description: 'Best for large businesses and enterprises.',
    features: ['Unlimited Users', '24/7 Support', 'Advanced Analytics'],
  },
];

const PlansAddOnsPage = () => {
  const [notification, setNotification] = useState(null);

  const handleSelectPlan = async (plan) => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setNotification({
        type: 'error',
        message: 'Please log in to select a plan.',
      });
      return;
    }

    let user;
    try {
      user = JSON.parse(storedUser);
    } catch (e) {
      console.error('❌ Invalid user object in localStorage');
      setNotification({
        type: 'error',
        message: 'User session is corrupted. Please log in again.',
      });
      return;
    }

    if (!user.id) {
      setNotification({
        type: 'error',
        message: 'User ID not found. Please log in again.',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/plans/save', {
        userId: user.id, // Change to user._id if needed
        planName: plan.name,
        price: plan.price,
      });

      console.log('✅ Plan saved successfully:', response.data);

      setNotification({
        type: 'success',
        message: `${plan.name} plan added to cart successfully!`,
      });
    } catch (error) {
      console.error('❌ Error saving plan:', error);
      setNotification({
        type: 'error',
        message: 'Failed to add plan. Please try again later.',
      });
    }
  };

  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>📦 Plans & Add-ons</h2>

      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}

      <div className="plans-container">
        {plans.map((plan, index) => (
          <div className="plan-card" key={index}>
            <div className="plan-header">
              <h3>{plan.name}</h3>
              <div className="plan-price">
                ₹{plan.price} <span>/month</span>
              </div>
            </div>
            <p className="plan-description">{plan.description}</p>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>
            <button className="plan-button" onClick={() => handleSelectPlan(plan)}>
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlansAddOnsPage;
