// src/Dashboard.tsx
import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { MenuIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { PackageIcon, TruckIcon, MailIcon } from "lucide-react";
import LeftSidebar from './LeftSidebar'; // Import LeftSidebar component
import MailTable from './Table';

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [packageCount, setPackageCount] = useState<number | null>(null);
  const [pendingCount, setPendingCount] = useState<number | null>(null);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prevState => !prevState);
  }, []);

useEffect(() => {
  const fetchCounts = async () => {
    try {
      const [deliveredResponse, pendingResponse] = await Promise.all([
        fetch('http://localhost:4000/api/shipments/count-delivered'),
        fetch('http://localhost:4000/api/shipments/count-pending')
      ]);

      if (!deliveredResponse.ok || !pendingResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const deliveredData = await deliveredResponse.json();
      const pendingData = await pendingResponse.json();

      console.log('Delivered Data:', deliveredData); // Log data
      console.log('Pending Data:', pendingData);     // Log data

      setPackageCount(deliveredData.count);
      setPendingCount(pendingData.count);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  fetchCounts();
}, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <LeftSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} lg:ml-0`}>
        <header className="bg-white shadow-sm p-4 flex items-center justify-between lg:hidden">
          <h1 className="text-xl font-bold text-primary">Post Office</h1>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Mail Processed</CardTitle>
                <MailIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Packages Shipped</CardTitle>
                <PackageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{packageCount !== null ? packageCount : 'Loading...'}</div>
                <p className="text-xs text-muted-foreground">+15.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Deliveries in Progress</CardTitle>
                <TruckIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingCount !== null ? pendingCount : 'Loading...'}</div>
                <p className="text-xs text-muted-foreground">-2.5% from last hour</p>
              </CardContent>
            </Card>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
