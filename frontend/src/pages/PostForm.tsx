import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Define the Post interface according to your backend schema
interface Post {
  consignmentNo: string;
  senderName: string;
  senderNumber: string;
  receiverName: string;
  receiverNumber: string;
  state: string;
  city: string;
  pincode: string;
  area: string;
  addressLine1: string;
  addressLine2?: string;
  deliveryStatus?: string;
  expiresAt: string; // Assuming it’s a string in ISO format
  uniqueId: string; // Unique ID for the post
}

const PostForm: React.FC = () => {
  // Access postOfficeId from route params
  const { postOfficeId } = useParams<{ postOfficeId: string }>();

  // Initialize form data with the Post interface
  const [formData, setFormData] = useState<Post>({
    consignmentNo: '',
    senderName: '',
    senderNumber: '',
    receiverName: '',
    receiverNumber: '',
    state: '',
    city: '',
    pincode: '',
    area: '',
    addressLine1: '',
    addressLine2: '',
    deliveryStatus: '',
    expiresAt: new Date().toISOString(), // Initialize with current date-time in ISO format
    uniqueId: '', // Initialize with an empty string or a generated value
  });

  // Handle change in input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate the presence of postOfficeId
    if (!postOfficeId) {
      alert('Post office ID is required');
      return;
    }

    try {
      // Update the URL to match your backend endpoint
      const response = await axios.post(`http://localhost:4000/api/${postOfficeId}/posts`, formData);
      alert('Post created successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="consignmentNo" className="block text-sm font-medium text-gray-700">Consignment Number</label>
            <input
              id="consignmentNo"
              type="text"
              name="consignmentNo"
              value={formData.consignmentNo}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="senderName" className="block text-sm font-medium text-gray-700">Sender Name</label>
            <input
              id="senderName"
              type="text"
              name="senderName"
              value={formData.senderName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="senderNumber" className="block text-sm font-medium text-gray-700">Sender Number</label>
            <input
              id="senderNumber"
              type="text"
              name="senderNumber"
              value={formData.senderNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="receiverName" className="block text-sm font-medium text-gray-700">Receiver Name</label>
            <input
              id="receiverName"
              type="text"
              name="receiverName"
              value={formData.receiverName}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="receiverNumber" className="block text-sm font-medium text-gray-700">Receiver Number</label>
            <input
              id="receiverNumber"
              type="text"
              name="receiverNumber"
              value={formData.receiverNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input
              id="state"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              id="pincode"
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
            <input
              id="area"
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
            <input
              id="addressLine1"
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
            <input
              id="addressLine2"
              type="text"
              name="addressLine2"
              value={formData.addressLine2 || ''}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="deliveryStatus" className="block text-sm font-medium text-gray-700">Delivery Status</label>
            <input
              id="deliveryStatus"
              type="text"
              name="deliveryStatus"
              value={formData.deliveryStatus || ''}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-primary border border-black text-black py-2 px-4 rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
