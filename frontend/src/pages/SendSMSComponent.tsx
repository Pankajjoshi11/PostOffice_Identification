import React, { useEffect, useCallback } from 'react';

interface SendSMSComponentProps {
  sendSms: boolean;
  phoneNumber: string;
  message: string;
}

const SendSMSComponent: React.FC<SendSMSComponentProps> = ({ sendSms, phoneNumber, message }) => {

  const sendSMS = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.error}`);
      }

      const data = await response.json();
      console.log(`SMS sent with SID: ${data.sid}`);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  }, [phoneNumber, message]);

  useEffect(() => {
    if (sendSms) {
      sendSMS();
    }
  }, [sendSms, sendSMS]);

  return (
    <div>
      {sendSms && <p>Sending SMS...</p>}
    </div>
  );
};

export default SendSMSComponent;
