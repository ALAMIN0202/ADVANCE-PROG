"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateAdminInfoForm() {
  const [adminInfo, setAdminInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdminInfo() {
      try {
        const response = await axios.get('http://localhost:3000/admin/updateadmininfo');
        const { firstName, lastName, email, contact } = response.data;
        setAdminInfo({ firstName, lastName, email, contact });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin information:', error);
        setLoading(false); // Set loading to false in case of error
      }
    }
    fetchAdminInfo();
  }, []);

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setAdminInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e :any) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3001/admin/update_admin', adminInfo);
      console.log('Admin information updated successfully');
    } catch (error) {
      console.error('Error updating admin information:', error);
    }
  };

  return (
    <div className="bg-sky-blue p-8 rounded-lg">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={adminInfo.firstName} onChange={handleChange} placeholder="Enter first name" className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={adminInfo.lastName} onChange={handleChange} placeholder="Enter last name" className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">Email:</label>
            <input type="email" id="email" name="email" value={adminInfo.email} onChange={handleChange} placeholder="Enter email" className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block">Contact:</label>
            <input type="text" id="contact" name="contact" value={adminInfo.contact} onChange={handleChange} placeholder="Enter contact" className="w-full border border-gray-300 rounded-md p-2" />
          </div>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md">Update</button>
        </form>
      )}
    </div>
  );
}
