import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ClientList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await axios.get("http://localhost:3000/admin/allclients");
        setClients(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchClients();
  }, []);

  const handleDelete = async (clientId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/delete/clientsid/${clientId}`);
      // After successful deletion, update the client list
      const updatedClients = clients.filter(client => client.id !== clientId);
      setClients(updatedClients);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <div className="mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : clients.length === 0 ? (
        <p>No clients available</p>
      ) : (
        <table className="table-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index}>
                <td>{client.id}</td>
                <td>{client.fastname}</td>
                <td>{client.lastname}</td>
                <td>{client.email}</td>
                <td>{client.contact}</td>
                <td>
                  <button onClick={() => handleDelete(client.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
