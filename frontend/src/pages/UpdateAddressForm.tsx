// UpdateAddressForm.tsx
import React, { useState } from 'react';

interface UpdateAddressFormProps {
  consignmentNo: string;
}

const UpdateAddressForm: React.FC<UpdateAddressFormProps> = ({ consignmentNo }) => {
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [area, setArea] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/update-address/${consignmentNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addressLine1,
          addressLine2,
          state,
          city,
          pincode,
          area,
          deliveryStatus
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Address updated successfully!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating address:', error);
      alert('An error occurred while updating the address.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
        <input
          id="addressLine1"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div>
        <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
        <input
          id="addressLine2"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value)}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
        <input
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div>
        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
        <input
          id="pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div>
        <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
        <input
          id="area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div>
        <label htmlFor="deliveryStatus" className="block text-sm font-medium text-gray-700">Delivery Status</label>
        <input
          id="deliveryStatus"
          value={deliveryStatus}
          onChange={(e) => setDeliveryStatus(e.target.value)}
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Update Address
      </button>
    </form>
  );
};

export default UpdateAddressForm;
