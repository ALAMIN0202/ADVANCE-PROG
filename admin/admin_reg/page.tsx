
/*import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation'
import { Toaster, toast } from 'react-hot-toast';

interface AdminFormData {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
}

export default function AdminRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState<AdminFormData>({
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
      const response = await axios.post('http://localhost:3000/admin/register', {
        firstName,
        lastName,
        email,
        contact,
        password
      });

      console.log(response.data);

      toast.success('Registration successful');
      router.push('http://localhost:3001/admin/admin_reg'); // Redirect to the specified URL

    } catch (error) {
      console.error('Error registering admin:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Toaster />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Registration</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input id="firstName" name="firstName" type="text" autoComplete="given-name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
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
}*/

/*"use client"


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface AdminDto {
  fastname: string;
  lastname: string;
  email: string;
  contact: string;
  password: string;
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<AdminDto>({
    fastname: '',
    lastname: '',
    
    email: '',
    contact:'',
    password: '',
   
   
  });
  const [errors, setErrors] = useState<Partial<AdminDto>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataObject = new FormData();
        formDataObject.append('fastname', formData.fastname);
        formDataObject.append('lastname', formData.lastname);
       // formDataObject.append('address', formData.address);
       // formDataObject.append('phoneNumber', formData.phoneNumber);
        formDataObject.append('email', formData.email);
        formDataObject.append('contact', formData.contact);
        formDataObject.append('password', formData.password);
      
        const response = await axios.post('http://localhost:3000/admin/register', formDataObject);
        console.log(response.data);
        
        toast.success('Signup successful!');
        router.push('/admin/admin_login');
     
      } 
      catch (error) {
        console.error('Error during signup:', error);
        toast.error('Signup failed. Please try again.');
      }
    } 
    else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e:any) => {
    const { fastname, value, files } = e.target;
    if (fastname === 'profilepic') {
      setFormData({ ...formData, [fastname]: files ? files[0] : null });
      setErrors({ ...errors, [fastname]: null });
    } else {
      setFormData({ ...formData, [fastname]: value });
      setErrors({ ...errors, [fastname]: '' });
    }
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.fastname) {
      errors.fastname = 'Name is required';
    }

    if (!formData.lastname) {
      errors.lastname = 'Username is required';
    }

    if (!formData.address) {
      errors.address = 'Address is required';
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^01\d{9}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number format. Phone number should be 11 digits starting with 01';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^@\s]+@aiub\.edu$/.test(formData.email)) {
      errors.email = 'Email must be an AIUB email address (example@aiub.edu)';
    }

    
    if (!formData.designation) {
      errors.designation = 'designation is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      errors.password = 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character';
    }


    if (!formData.nid) {
      errors.nid = 'NID is required';
    } else if (!/^\d{10}$/.test(formData.nid)) {
      errors.nid = 'Invalid Bangladeshi NID number format. NID must be exactly 10 digits';
    }

    
    if (!formData.dob) {
      errors.dob = 'DOB is required';
    }
    

    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <center><h1 className="text-3xl font-bold text-white mb-6">Sign Up</h1></center>
        <Toaster />
        <form onSubmit={handleSubmit} className="bg-gray-900 rounded px-8 pt-6 pb-8">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-200 font-bold mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    placeholder='Name'
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.name && <p className="text-red-400 text-xs italic">{errors.name}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-200 font-bold mb-2">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    placeholder='Username'
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.username && <p className="text-red-400 text-xs italic">{errors.username}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="address" className="block text-gray-200 font-bold mb-2">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    placeholder='Address'
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.address && <p className="text-red-400 text-xs italic">{errors.address}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-200 font-bold mb-2">
                    Phone Number
                </label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder='Phone Number'
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.phoneNumber && <p className="text-red-400 text-xs italic">{errors.phoneNumber}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-200 font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    placeholder='Email'
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.email && <p className="text-red-400 text-xs italic">{errors.email}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="designation" className="block text-gray-200 font-bold mb-2">
                    Designation
                </label>
                <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    placeholder='Designation'
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.designation && <p className="text-red-400 text-xs italic">{errors.designation}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-200 font-bold mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder='Password'
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.password && <p className="text-red-400 text-xs italic">{errors.password}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="nid" className="block text-gray-200 font-bold mb-2">
                    National ID
                </label>
                <input
                    type="text"
                    id="nid"
                    name="nid"
                    value={formData.nid}
                    placeholder='NID'
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.nid && <p className="text-red-400 text-xs italic">{errors.nid}</p>}
            </div>
            <div className="mb-6">
                <label htmlFor="profilepic" className="block text-gray-200 font-bold mb-2">
                    Profile Picture
                </label>
                <input
                    type="file"
                    id="profilepic"
                    name="profilepic"
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="dob" className="block text-gray-200 font-bold mb-2">
                    Date of Birth
                </label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                />
                {errors.dob && <p className="text-red-400 text-xs italic">{errors.dob}</p>}
            </div>
            <div className="flex items-center justify-center mt-6"> {/* Adjusted for centering the button }
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Sign Up
            </button>
            </div>
        </form>
    </div>
  );
};
/*"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface AdminDto {
  fastname: string;
  lastname: string;
  email: string;
  contact: number;
  password: string;
}

export default function Registration() {
  const router = useRouter();
  const [formData, setFormData] = useState<AdminDto>({
    fastname: '',
    lastname: '',
    email: '',
    contact: 0,
    password: '',
  });
  const [errors, setErrors] = useState<Partial<AdminDto>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('/api/register', formData);
        console.log(response.data);
        toast.success('Registration successful!');
        router.push('/login');
      } catch (error) {
        console.error('Error during registration:', error);
        toast.error('Registration failed. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = (formData: AdminDto): Partial<AdminDto> => {
    const validationErrors: Partial<AdminDto> = {};

    if (!formData.fastname) {
      validationErrors.fastname = 'First name is required';
    }

    if (!formData.lastname) {
      validationErrors.lastname = 'Last name is required';
    }

    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!formData.contact) {
      validationErrors.contact = 'Contact number is required';
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long';
    }

    return validationErrors;
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <center><h1 className="text-3xl font-bold text-white mb-6">Registration</h1></center>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label htmlFor="fastname" className="block text-gray-200 font-bold mb-2">First Name</label>
          <input type="text" id="fastname" name="fastname" value={formData.fastname} placeholder="First Name" onChange={handleInputChange} className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
          {errors.fastname && <p className="text-red-400 text-xs italic">{errors.fastname}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block text-gray-200 font-bold mb-2">Last Name</label>
          <input type="text" id="lastname" name="lastname" value={formData.lastname} placeholder="Last Name" onChange={handleInputChange} className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
          {errors.lastname && <p className="text-red-400 text-xs italic">{errors.lastname}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-200 font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" value={formData.email} placeholder="Email" onChange={handleInputChange} className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
          {errors.email && <p className="text-red-400 text-xs italic">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-200 font-bold mb-2">Contact Number</label>
          <input type="tel" id="contact" name="contact" value={formData.contact} placeholder="Contact Number" onChange={handleInputChange} className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
          {errors.contact && <p className="text-red-400 text-xs italic">{errors.contact}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-200 font-bold mb-2">Password</label>
          <input type="password" id="password" name="password" value={formData.password} placeholder="Password" onChange={handleInputChange} className="bg-gray-700 text-gray-100 border border-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500" />
          {errors.password && <p className="text-red-400 text-xs italic">{errors.password}</p>}
        </div>
        <div className="flex items-center justify-center mt-6">
          <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
        </div>
      </form>
    </div>
  );
};*/
"use client"

import Link from "next/link";
import Meta from "@/app/component/meta";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


const AdminReg = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    fastname: "",
    lastname: "",
    email: "",
    contact: Number,
    password: "",
    filename: ""
  });
  const { fastname, lastname, email, contact, password, filename } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isValidFastName = (fastname) => {
    return fastname.length >= 2;
  }
  const isValidLastName = (lastname) => {
    return lastname.length >= 4;
  }
  const isValidLastNameM = (lastname) => {
    const machName = /^[a-zA-Z]+[a-zA-Z]+$/;
    return machName.test(lastname)
  }

  


  const handleSubmit = async (event) => {
    event.preventDefault()
    user.contact = parseInt(user.contact);
    if (!email || !password || !fastname || !lastname || !contact) {
      setError('All Field required');
    }else if (!isValidFastName(fastname)){
      setError("Fast Name must be 2 bit")
    }
    else if (!isValidLastName(lastname) ){
      setError(" Name must be 3 bit")
    }
    else if (!isValidLastNameM(lastname) ){
      setError("Last Name not suppourt Number")
    }
     else {
      const res = await doSignUp(user)
      console.log(res);
    }
  }
  const doSignUp = async (event) => {
    try {
      const response = await axios.post('http://localhost:3000/admin/register', user, {

        headers: {

          'Content-Type': 'application/json',
  
        },
        withCredentials: true

      });

      console.log(response.data);

      alert("Admin Registration Successful!");
      router.push('/admin/admin_log');

    } catch (error) {

      console.error('Error Manager Signing Up:', error);

      alert("Admin Registration Failed!");

    }

  };


  return (
    <>
      <Meta title="Admin Registration" keywords="fahad" description="Fahad" />
      <center>


        <div className=" formcssr p-1">
          <h1 className="text-black texts mb-5 mt-5">This is Admin Registration Page</h1>
          <form onSubmit={handleSubmit} className=" text-black ">
            <label className="texts ">Enter first name&nbsp;&nbsp;&nbsp;
              <input type="text"  maxLength="5" className="text-xs rounded-lg " id="fastname" name="fastname" onChange={handleChange} value={fastname} />
            </label><br></br>

            <label className="texts">Enter last name&nbsp;&nbsp;&nbsp;&nbsp;
              <input className=" text-xs mt-2 rounded-lg" type="text"   id="lastname" name="lastname" onChange={handleChange} value={lastname} />
            </label><br></br>
            

            <label className="texts">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input className="mt-2 text-xs rounded-lg" type="email"  id="email" name="email" onChange={handleChange} value={email} />
            </label><br></br>

            <label className="texts">Phone &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input className="mt-2 text-xs rounded-lg"  minLength="10" type="number" id="contact" name="contact" onChange={handleChange} value={contact} />
            </label><br></br>

            <label className="texts">Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input className="mt-2 text-xs rounded-lg" type="password"  minLength="4" id="password" name="password" onChange={handleChange} value={password} />
            </label><br></br>


            <label className="texts">Image
              <input className="mt-2 text-xs" type="file" name="filename" onChange={handleChange} value={filename} />
            </label><br></br>

            {error && <p className="text-red-700 absolute mt-3 left-0 right-0  mr-auto ">{error}</p>}
            <button className="bts w-10/12 mt-12 mb-6 bts focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit">Registration</button>
            <p>Already you have a Account! <Link className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900 bts" href="admin_log">Log in</Link></p>
          </form>
        </div>

        {/* <p>Already you have a Account! <Link href="admin_log">Log in</Link></p>
        <Link href="/home">Home</Link> */}

      </center>

    </>
  );
}

export default AdminReg