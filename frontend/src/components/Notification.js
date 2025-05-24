import React from 'react';
import '../styles/Notification.css'; // optional if you want to move styles out

const Notification = ({ type = 'success', message }) => {
  const getStyle = () => {
    switch (type) {
      case 'success':
        return 'notification success';
      case 'info':
        return 'notification info';
      case 'warning':
        return 'notification warning';
      case 'error':
        return 'notification error';
      default:
        return 'notification';
    }
  };

  return (
    <div className={getStyle()}>
      <span className="icon">ℹ️</span>
      <span>{message}</span>
    </div>
  );
};

export default Notification;
