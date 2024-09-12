import React from 'react';
import UpdatePostForm from '../components/UpdatePostForm';
import { useParams } from 'react-router-dom';

// Function to trigger the API and generate a link
async function generateLink(consignmentNo:string) {
  const url = 'http://localhost:5000/generate-link'; // Your backend API endpoint

  try {
    // Send POST request to the backend
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ consignmentNo }), // Send the consignment number as payload
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`Failed to generate link: ${response.statusText}`);
    }

    // Parse the response data
    const data = await response.json();
    
    // Handle success (the generated link is in the response)
    console.log('Generated link:', data.link);
    return data.link; // You can return the link to use it later

  } catch (error) {
    // Handle errors
    console.error('Error generating link:', error.message);
    return null;
  }
}

// Example usage:
const consignmentNo = 'ABC12345'; // Example consignment number
generateLink(consignmentNo).then((link) => {
  if (link) {
    // Do something with the link, e.g., show it to the user or copy it to clipboard
    console.log('Link generated:', link);
  } else {
    console.log('Failed to generate link.');
  }
});




const UpdatePostPage: React.FC = () => {
  const { consignmentNo } = useParams<{ consignmentNo: string }>();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <UpdatePostForm consignmentNo={consignmentNo || ''} />
    </div>
  );
};

export default UpdatePostPage;
