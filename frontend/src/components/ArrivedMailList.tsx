import React, { useState, useEffect } from 'react';

interface MailItem {
  _id: string;
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
}

const ArrivedMailList: React.FC = () => {
  const [arrivedMail, setArrivedMail] = useState<MailItem[]>([]);
  const [selectedMail, setSelectedMail] = useState<MailItem | null>(null);

  useEffect(() => {
    // Fetch the list of arrived mail
    const fetchArrivedMail = async () => {
      try {
        const response = await fetch('/api/posts/arrived'); // Adjust this endpoint as necessary
        const data = await response.json();
        setArrivedMail(data);
      } catch (error) {
        console.error('Error fetching arrived mail:', error);
      }
    };

    fetchArrivedMail();
  }, []);

  const handleMailClick = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/arrived/${id}`); // Adjust this endpoint as necessary
      const data = await response.json();
      setSelectedMail(data);
    } catch (error) {
      console.error('Error fetching mail details:', error);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/3 p-4">
        <h2 className="text-lg font-bold mb-4">Arrived Mail</h2>
        <ul className="space-y-2">
          {arrivedMail.map((mail) => (
            <li
              key={mail._id}
              className="p-2 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => handleMailClick(mail._id)}
            >
              <p><strong>Consignment No:</strong> {mail.consignmentNo}</p>
              <p><strong>Sender:</strong> {mail.senderName}</p>
              <p><strong>Receiver:</strong> {mail.receiverName}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 p-4">
        {selectedMail ? (
          <div>
            <h2 className="text-lg font-bold mb-4">Mail Details</h2>
            <p><strong>Consignment No:</strong> {selectedMail.consignmentNo}</p>
            <p><strong>Sender Name:</strong> {selectedMail.senderName}</p>
            <p><strong>Sender Number:</strong> {selectedMail.senderNumber}</p>
            <p><strong>Receiver Name:</strong> {selectedMail.receiverName}</p>
            <p><strong>Receiver Number:</strong> {selectedMail.receiverNumber}</p>
            <p><strong>Address Line 1:</strong> {selectedMail.addressLine1}</p>
            <p><strong>Address Line 2:</strong> {selectedMail.addressLine2 || 'N/A'}</p>
            <p><strong>City:</strong> {selectedMail.city}</p>
            <p><strong>State:</strong> {selectedMail.state}</p>
            <p><strong>Pincode:</strong> {selectedMail.pincode}</p>
            <p><strong>Area:</strong> {selectedMail.area}</p>
          </div>
        ) : (
          <p>Select a mail item to view details</p>
        )}
      </div>
    </div>
  );
};

export default ArrivedMailList;
