// Dashboard.tsx
import React, { useState, ReactNode, useCallback } from 'react';
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

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prevState => !prevState);
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
                <div className="text-2xl font-bold">567</div>
                <p className="text-xs text-muted-foreground">+15.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Deliveries in Progress</CardTitle>
                <TruckIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
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
