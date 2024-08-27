import PostApi from "../components/PostApi";
// initialising dev branch
import React, { useState } from "react";
import SendSMSComponent from "./SendSMSComponent";

const Main: React.FC = () => {
  const [sendSms, setSendSms] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1>Main</h1>
      <PostApi />
    
      <div>
        <button onClick={() => setSendSms(true)}>Send SMS</button>
        <SendSMSComponent
          sendSms={sendSms}
          phoneNumber="+919653268068"
          message="This is message from react app!"
        />
      </div>
    
    </div>
  );
};

export default Main;