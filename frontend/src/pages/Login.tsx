import React, { useState, useCallback } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

// Define the validation schema
export const LoginValidation = z.object({
  pincode: z.string().min(1, "Pincode is required"),
  name: z.string().min(1, "Name is required"),
  password: z.string()
    .min(2, "Password must be at least 2 characters")
    .max(50, "Password must be at most 50 characters"),
});

// Fetch names for autocomplete based on pincode
const fetchNames = async (pincode: string): Promise<string[]> => {
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    if (data[0].Status === 'Success') {
      return data[0].PostOffice.map((postOffice: { Name: string }) => postOffice.Name);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching names:', error);
    return [];
  }
};

const Login: React.FC = () => {
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      pincode: "",
      name: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [nameOptions, setNameOptions] = useState<string[]>([]);
  const [pincode, setPincode] = useState<string>('');

  const onSubmit = async (data: z.infer<typeof LoginValidation>) => {
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', data);
      console.log('Login successful:', response.data);
      navigate('/'); // Redirect after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid credentials');
    }
  };

  // Fetch names based on pincode input
  const handlePincodeChange = useCallback(debounce(async (newPincode: string) => {
    setPincode(newPincode);
    if (newPincode.length === 6) { // Assuming pincode length is 6
      const names = await fetchNames(newPincode);
      setNameOptions(names);
    }
  }, 300), []);

  // Handle autocomplete selection
  const handleNameSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    form.setValue('name', event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="pincode" className="block text-white text-sm font-semibold mb-2">Pincode</label>
            <input
              id="pincode"
              type="text"
              {...form.register("pincode")}
              placeholder="Enter pincode"
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => handlePincodeChange(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white text-sm font-semibold mb-2">Name</label>
            <select
              id="name"
              {...form.register("name")}
              onChange={handleNameSelect}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="" disabled>Select your name</option>
              {nameOptions.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white text-sm font-semibold mb-2">Password</label>
            <input
              id="password"
              type="password"
              {...form.register("password")}
              placeholder="********"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
