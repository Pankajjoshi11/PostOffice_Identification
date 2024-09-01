import React from 'react';
import UpdatePostForm from '../components/UpdatePostForm';
import { useParams } from 'react-router-dom';

const UpdatePostPage: React.FC = () => {
  const { consignmentNo } = useParams<{ consignmentNo: string }>();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <UpdatePostForm consignmentNo={consignmentNo || ''} />
    </div>
  );
};

export default UpdatePostPage;
