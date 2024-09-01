const sendUpdateLink = async (phoneNumber, consignmentNo) => {
  try {
    const response = await fetch('/api/send-update-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, consignmentNo }),
    });
    const data = await response.json();
    console.log('SMS sent with SID:', data.sid);
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

sendUpdateLink('+919653268068', 'ABC123'); // Example usage
