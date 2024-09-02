import React, { useState } from 'react';

interface Post {
  id: string;
  address: {
    pincode: string;
    areaName: string;
  };
  addressVerified: boolean;
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      address: {
        pincode: '110001',
        areaName: 'Connaught Place',
      },
      addressVerified: false,
    },
    {
      id: '2',
      address: {
        pincode: '560033',
        areaName: 'MG Road',
      },
      addressVerified: false,
    },
    {
      id: '3',
      address: {
        pincode: '400001',
        areaName: 'Colaba',
      },
      addressVerified: false,
    },
    {
      id: '4',
      address: {
        pincode: '600001',
        areaName: 'T Nagar',
      },
      addressVerified: false,
    },
    {
      id: '5',
      address: {
        pincode: '700001',
        areaName: 'Park Street',
      },
      addressVerified: false,
    },
  ]);

  // Mock function to simulate fetching pincodes from India Post API
  const fetchPincodes = async (areaName: string) => {
    // Simulate different responses based on the area name
    const mockApiResponse: { [key: string]: string[] } = {
      'Connaught Place': ['110001', '110002'],
      'MG Road': ['560001', '560033'],
      'Colaba': ['400001', '400005'],
      'T Nagar': ['600017', '600018'],
      'Park Street': ['700016', '700017'],
    };

    return mockApiResponse[areaName] || [];
  };

  // Function to handle check button click
  const handleCheckPincode = async (post: Post) => {
    const pincodes = await fetchPincodes(post.address.areaName);

    if (pincodes && Array.isArray(pincodes)) {
      const isVerified = pincodes.includes(post.address.pincode);

      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id ? { ...p, addressVerified: isVerified } : p
        )
      );
    } else {
      console.error('Pincodes is not an array or is undefined');
    }
  };

  return (
    <div>
      <h1>Posts List</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4 p-4 border border-gray-300 rounded">
            <div className="text-lg font-bold">Post ID: {post.id}</div>
            <div>Pincode: {post.address.pincode}</div>
            <div>Area: {post.address.areaName}</div>
            <button
              onClick={() => handleCheckPincode(post)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Check Address
            </button>
            <div className={`mt-2 ${post.addressVerified ? 'text-green-500' : 'text-red-500'}`}>
              Address Verified: {post.addressVerified ? 'Yes' : 'No'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
