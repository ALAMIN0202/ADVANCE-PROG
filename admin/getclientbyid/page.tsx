"use client"
import axios from 'axios';
import { useState } from 'react';

export default function ClientDetails() {
  const [clientId, setClientId] = useState('');
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/getclients/${clientId}`);
      setClientData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Client Details</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Client ID:
          <input type="text" value={clientId} onChange={(e) => setClientId(e.target.value)} />
        </label>
        <button type="submit">Get Client</button>
      </form>
      {error && <p className="error">Error: {error}</p>}
      {clientData && (
        <div className="client-details">
          <p><b>ID:</b> {clientData.id}</p>
          <p><b>First Name:</b> {clientData.firstName}</p>
          <p><b>Last Name:</b> {clientData.lastName}</p>
          <p><b>Email:</b> {clientData.email}</p>
          <p><b>Contact:</b> {clientData.contact}</p>
        </div>
      )}
    </div>
  );
}
