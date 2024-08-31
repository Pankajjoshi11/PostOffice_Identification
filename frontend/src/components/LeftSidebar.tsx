import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MailIcon, UserIcon, SendIcon, MenuIcon } from 'lucide-react';

interface LeftSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <aside 
      className={`
        bg-white shadow-md w-64 fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:w-64
      `}
      aria-label="Sidebar"
    >
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary hidden lg:block">Post Office</h1>
        <button 
          className="lg:hidden text-gray-500 hover:text-gray-700"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="mt-6">
        <Link to="/" className={`block px-4 py-2 text-gray-600 hover:bg-gray-200 ${location.pathname === '/' ? 'bg-gray-200' : ''}`} aria-current={location.pathname === '/' ? 'page' : undefined}>
          <MailIcon className="inline-block mr-2" size={18} />
          Dashboard
        </Link>
        <Link to="/profile" className={`block px-4 py-2 text-gray-600 hover:bg-gray-200 ${location.pathname === '/profile' ? 'bg-gray-200' : ''}`} aria-current={location.pathname === '/profile' ? 'page' : undefined}>
          <UserIcon className="inline-block mr-2" size={18} />
          Profile
        </Link>
        <Link to="/send" className={`block px-4 py-2 text-gray-600 hover:bg-gray-200 ${location.pathname === '/send' ? 'bg-gray-200' : ''}`} aria-current={location.pathname === '/send' ? 'page' : undefined}>
          <SendIcon className="inline-block mr-2" size={18} />
          Send Mail
        </Link>
      </nav>
    </aside>
  );
};

export default LeftSidebar;
