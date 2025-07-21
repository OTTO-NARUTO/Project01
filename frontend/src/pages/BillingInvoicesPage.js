import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/BillingInvoicesPage.css';

const BillingInvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/plans/${user.id}`);
        const plans = response.data;

        const formatted = plans.map((plan, index) => ({
          id: index + 1,
          item: plan.planName,
          date: new Date(plan.selectedAt).toISOString().slice(0, 10),
          amount: `₹${plan.price}`,
          status: 'Pending',
        }));

        setInvoices(formatted);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };

    if (user?.id) {
      fetchInvoices();
    }
  }, []);

  const handleDelete = (id) => {
    const updated = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updated);
  };

  return (
    <>
      <Navbar />
      <div className="invoice-container">
        <h2 className="invoice-title">💳 Billing & Invoices</h2>
        {invoices.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No plans selected yet.</p>
        ) : (
          invoices.map((invoice) => (
            <div className="invoice-card" key={invoice.id}>
              <div className="invoice-details">
                <p className="invoice-item"><strong>{invoice.item}</strong></p>
                <p>Date: {invoice.date}</p>
                <p>Status:
                  <span className={invoice.status === 'Paid' ? 'status-paid' : 'status-failed'}>
                    {invoice.status}
                  </span>
                </p>
                <p>Amount: <strong>{invoice.amount}</strong></p>
              </div>
              <div className="invoice-actions">
                <button
                  className="download-btn"
                  onClick={() => alert(`Downloading invoice for ${invoice.item}`)}
                >
                  Download
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(invoice.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default BillingInvoicesPage;
