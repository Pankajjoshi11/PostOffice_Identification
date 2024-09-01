import React, { useState } from 'react';

interface UpdatePostFormProps {
  consignmentNo: string;
}

const UpdatePostForm: React.FC<UpdatePostFormProps> = ({ consignmentNo }) => {
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/posts/${consignmentNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const data = await response.json();
      console.log('Post updated:', data);
      // You can add further actions here, like showing a success message or redirecting the user
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Update Post Information</h2>

      <input
        type="text"
        name="senderName"
        value={formData.senderName}
        onChange={handleChange}
        placeholder="Sender Name"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="senderNumber"
        value={formData.senderNumber}
        onChange={handleChange}
        placeholder="Sender Number"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="receiverName"
        value={formData.receiverName}
        onChange={handleChange}
        placeholder="Receiver Name"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="receiverNumber"
        value={formData.receiverNumber}
        onChange={handleChange}
        placeholder="Receiver Number"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        placeholder="Pincode"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="area"
        value={formData.area}
        onChange={handleChange}
        placeholder="Area"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="addressLine1"
        value={formData.addressLine1}
        onChange={handleChange}
        placeholder="Address Line 1"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="addressLine2"
        value={formData.addressLine2}
        onChange={handleChange}
        placeholder="Address Line 2 (Optional)"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <input
        type="text"
        name="deliveryStatus"
        value={formData.deliveryStatus}
        onChange={handleChange}
        placeholder="Delivery Status"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Update Post
      </button>
    </form>
  );
};

export default UpdatePostForm;
