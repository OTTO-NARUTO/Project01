import React , {useEffect, useState} from 'react';
const NotificationsPage =() => {
    const [notifications,setNotifications] = useState([]);
useEffect(() => {
   const dummyData = [
      { id: 1, message: "Your subscription was renewed successfully!", date: "2025-05-20" },
      { id: 2, message: "You have a new message from support.", date: "2025-05-19" },
      { id: 3, message: "Password changed successfully.", date: "2025-05-18" },
   ];
   setNotifications(dummyData);
}, []);
return  (
    <div style={{ padding: "20px" }}>
      <h2>🔔 Notifications</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {notifications.map((note) => (
          <li key={note.id} style={{ border: "1px solid #ccc", borderRadius: "10px", marginBottom: "10px", padding: "10px" }}>
            <strong>{note.message}</strong>
            <br />
            <small style={{ color: "gray" }}>{note.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;



