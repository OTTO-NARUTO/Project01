import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/PlansAddOns.css';
import Notification from '../components/Notification';

const plans = [
  { name: 'Basic', price: '₹500', description: 'Perfect for individuals or startups.', features: ['1 User', 'Basic Support', 'Access to Dashboard'] },
  { name: 'Medium', price: '₹1000', description: 'Ideal for small teams and growing needs.', features: ['5 Users', 'Priority Support', 'Team Collaboration'] },
  { name: 'Premium', price: '₹1500', description: 'Best for large businesses and enterprises.', features: ['Unlimited Users', '24/7 Support', 'Advanced Analytics'] },
];

const PlansAddOnsPage = () => {
  const [notification, setNotification] = useState(null);

  const handleSelectPlan = (plan) => {
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    setNotification({ type: 'success', message: `${plan.name} plan added to cart!` });
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
              <div className="plan-price">{plan.price} <span>/month</span></div>
            </div>
            <p className="plan-description">{plan.description}</p>
            <ul>
              {plan.features.map((feature, i) => <li key={i}>✔ {feature}</li>)}
            </ul>
            <button className="plan-button" onClick={() => handleSelectPlan(plan)}>Choose Plan</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlansAddOnsPage;
