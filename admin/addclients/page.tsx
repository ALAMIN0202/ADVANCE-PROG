"use client"
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

interface ClientFormData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
}

export default function ClientRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, contact, password } = formData;

    if (!firstName || !lastName || !email || !contact || !password) {
      toast.error('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register/clients', {
        firstName,
        lastName,
        email,
        contact,
        password
      });

      console.log(response.data);

      toast.success('Client registration successful');
      router.push('http://localhost:3001/admin/addclients'); // Redirect to the specified URL after successful registration

    } catch (error) {
      console.error('Error registering client:', error);
      toast.error('Client registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-lg p-8 shadow-md">
        <div>
          <Toaster />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Client Registration</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input id="firstName" name="firstName" type="text" autoComplete="given-name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input id="lastName" name="lastName" type="text" autoComplete="family-name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" autoComplete="email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="contact" className="sr-only">Contact</label>
              <input id="contact" name="contact" type="tel" autoComplete="tel" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Contact" value={formData.contact} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
