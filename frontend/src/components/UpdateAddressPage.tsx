// UpdateAddressPage.tsx
import React from 'react';
import UpdateAddressForm from '../pages/UpdateAddressForm'; // Adjust the path as necessary
import { useParams, Navigate } from 'react-router-dom';

const UpdateAddressPage: React.FC = () => {
  const { consignmentNo } = useParams<{ consignmentNo?: string }>(); // Note the optional type

  // Handle the case where consignmentNo is undefined
  if (!consignmentNo) {
    return <Navigate to="/error" replace />; // Redirect to an error page or show a message
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Update Address</h1>
      <UpdateAddressForm consignmentNo={consignmentNo} />
    </div>
  );
};

export default UpdateAddressPage;
