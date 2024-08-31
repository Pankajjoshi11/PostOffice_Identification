import React, { useState } from "react";
import SendSMSComponent from "./SendSMSComponent";
import Dashboard from "../components/Dashboard";
import PostApi from "../components/PostApi";
import MailTable from "../components/Table"; // Import the MailTable component

const Main: React.FC = () => {
  const [sendSms, setSendSms] = useState<boolean>(false);

  // Sample data for MailTable
  const mailData = [
    { id: 1, email: "example1@mail.com", status: "Delivered", consignmentNo: "CN001", date: new Date(new Date().getTime() - 1 * 60 * 60 * 1000) },  // 1 hour ago
    { id: 2, email: "example2@mail.com", status: "Pending", consignmentNo: "CN002", date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000) },  // 2 days ago
    { id: 3, email: "example3@mail.com", status: "Failed", consignmentNo: "CN003", date: new Date(new Date().getTime() - 8 * 24 * 60 * 60 * 1000) },  // 8 days ago
  ];

  return (
    <Dashboard>
      <div className="container mx-auto p-4 min-h-screen">
              {/* POSTAPI and SENDSMS funcitonality will be seen later on */}


        {/* Add the MailTable component below the Dashboard */}
        <div className="mt-8">
          <MailTable data={mailData} />
        </div>
      </div>
    </Dashboard>
  );
};

export default Main;
