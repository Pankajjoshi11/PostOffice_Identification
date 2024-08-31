import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MailIcon, UserIcon, SendIcon, MenuIcon } from 'lucide-react';
import Dashboard from './Dashboard';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
        className={`
          bg-white shadow-md w-64 fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0
        `}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary">Post Office</h1>
        </div>
        <nav className="mt-6">
          <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-200">
            <MailIcon className="inline-block mr-2" size={18} />
            Dashboard
          </Link>
          <Link to="/profile" className="block px-4 py-2 text-gray-600 hover:bg-gray-200">
            <UserIcon className="inline-block mr-2" size={18} />
            Profile
          </Link>
          <Link to="/send" className="block px-4 py-2 text-gray-600 hover:bg-gray-200">
            <SendIcon className="inline-block mr-2" size={18} />
            Send Mail
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={toggleSidebar}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-primary lg:hidden">Post Office</h1>
          <div>{/* Placeholder for potential right-side header content */}</div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;