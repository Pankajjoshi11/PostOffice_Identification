import React, { useState } from 'react';
import axios from 'axios';

const PostApi: React.FC = () => {
  const [data, setData] = useState<PostOffice[]>([]);
  const [input, setInput] = useState<string>(''); // State to store the input value
  const [error, setError] = useState<string | null>(null); // State to store error messages
  const [status, setStatus] = useState<string>(''); // State to store the status

  const userPincode = 400067;
  //const userDistrict = 'Mumbai';

  interface PostOffice {
    Name: string;
    BranchType: string;
    District: string;
    Division: string;
    Pincode: string;
  }

  interface ApiResponse {
    PostOffice: PostOffice[];
  }

  // Helper function to determine if input is a pincode (all digits)
  const isPincode = (query: string): boolean => /^\d+$/.test(query);

  const fetchData = async (query: string) => {
    const apiUrl = isPincode(query)
      ? `https://api.postalpincode.in/pincode/${query}`
      : `https://api.postalpincode.in/postoffice/${query}`;

    try {
      const response = await axios.get<ApiResponse[]>(apiUrl);
      const postOffices = response.data[0]?.PostOffice || [];
      setData(postOffices);
      setError(null);

      const pincodes = postOffices.map((postOffice) => postOffice.Pincode);

      if (pincodes.includes(userPincode.toString()) /*&& districts.includes(userDistrict.toString()) */) {
        setStatus('OK');
        updateAddressVerification(true); // Address matches, set verified to true
      } else {
        setStatus(`NOT FOUND. Suggested Pincode: ${pincodes[0]}`);
        updateAddressVerification(false); // Address doesn't match, set verified to false
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
      setError('No data found or invalid query.');
      setStatus('');
    }
  };

  // Function to update the address verification status in the backend
  const updateAddressVerification = async (isVerified: boolean) => {
    try {
      const consignmentNo = 'YourConsignmentNo'; // Replace this with the actual consignment number
      const response = await axios.patch(`/api/posts/${consignmentNo}`, {
        addressVerified: isVerified,
      });
      console.log('Address verification updated:', response.data);
    } catch (error) {
      console.error('Error updating address verification:', error);
    }
  };

  const handleSearch = () => {
    if (input.trim()) {
      fetchData(input.trim());
    } else {
      setError('Please enter a valid pincode or city.');
      setData([]);
      setStatus('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Postal Information</h1>
      <div className="mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Pincode or City"
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Search
        </button>
      </div>

      {status && <p className="text-green-500 mb-4">Status: {status}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Branch Type</th>
            <th className="py-2 px-4 border">District</th>
            <th className="py-2 px-4 border">Division</th>
            <th className="py-2 px-4 border">Pincode</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((postOffice, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{postOffice.Name}</td>
                <td className="py-2 px-4 border">{postOffice.BranchType}</td>
                <td className="py-2 px-4 border">{postOffice.District}</td>
                <td className="py-2 px-4 border">{postOffice.Division}</td>
                <td className="py-2 px-4 border">{postOffice.Pincode}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-2 px-4 border text-center">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostApi;
