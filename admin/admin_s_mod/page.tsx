"use client"
import React, { useState } from 'react';
import axios from 'axios';

const ModeratorSearchPage = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/search/moderator?email=${searchEmail}`);
      setSearchResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error searching moderator:', error);
      setError('Error searching moderator. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-3xl text-center font-bold">Search Moderator</h1>
        <div className="flex">
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Enter email"
            className="appearance-none rounded-l-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <button
            onClick={handleSearch}
            className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-r-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {searchResult && (
          <div>
            <h2 className="text-2xl font-bold mt-4">Search Result</h2>
            <p>ID: {searchResult.id}</p>
            <p>First Name: {searchResult.firstName}</p>
            <p>Last Name: {searchResult.lastName}</p>
            <p>Email: {searchResult.email}</p>
            <p>Contact: {searchResult.contact}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeratorSearchPage;
