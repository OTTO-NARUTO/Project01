import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/BillingInvoicesPage.css';

const BillingInvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const storedPlan = localStorage.getItem("selectedPlan");
    if (storedPlan) {
      const plan = JSON.parse(storedPlan);
      setInvoices([
        {
          id: 1,
          item: plan.name,
          date: new Date().toISOString().slice(0, 10),
          amount: plan.price,
          status: 'Pending',
        },
      ]);
    }
  }, []);

  const handleDelete = (id) => {
    const updated = invoices.filter((invoice) => invoice.id !== id);
    setInvoices(updated);
    localStorage.removeItem('selectedPlan');
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
