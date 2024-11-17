// AdminMessages.js
import React, { useState, useEffect } from 'react';

const AdminMessages = () => {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    // Fetch messages from local storage
    const storedMessage = JSON.parse(localStorage.getItem('message')) || [];
    setMessage(storedMessage);
  }, []);

  return (
    <div>
      <h1>Contact Messages</h1>
      {Array.isArray(message) && message.length > 0 ? (
        message.map((msg, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{msg.fullname}</h5>
              <p className="card-text"><strong>Email:</strong> {msg.email}</p>
              <p className="card-text"><strong>Phone:</strong> {msg.phone}</p>
              <p className="card-text"><strong>Message:</strong> {msg.message}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No messages found</p>
      )}
    </div>
  );
};

export default AdminMessages;
