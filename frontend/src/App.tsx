import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignUpMain from './pages/SignUpMain';
import Main from './pages/Main';
import Dashboard from './components/Dashboard';
import EditAddress from './pages/editAdress';
import Employees from './pages/Employees';
import Packages from './pages/Packages';
import Schedule from './pages/Schedule';
// import AddressForm from './pages/EditAddress';
import PostForm from './pages/PostForm';

// Update the Dashboard route to handle dynamic postOfficeId
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Set login as the landing page */}
        <Route path="/" element={<Login />} />

        {/* Route for sign-up */}
        <Route path="/signup" element={<SignUpMain />} />
<<<<<<< HEAD
        {/*
        <Route path="/update-address/:consignmentNo" element={<UpdatePostPage />} />
       */}
        {/*<Route path="/employees" element={<Employees />} />*/}
        <Route path="/packages" element={<Packages />} />
        
=======
        <Route path="/login" element={<Login />} />

        {/* Main route with the dashboard containing the unique postOfficeId */}
        <Route path="/dashboard/:postOfficeId" element={<Dashboard />} />

        {/* Additional routes */}
        <Route path="/update-address/:uniqueId" element={<EditAddress />} />
        <Route path="/dashboard/:postOfficeId/employees" element={<Employees />} />
        <Route path="/dashboard/:postOfficeId/packages" element={<Packages />} />
        <Route path="/dashboard/:postOfficeId/schedule" element={<Schedule />} />
        {/* <Route path="/address-form" element={<AddressForm />} /> */}
        <Route path="/dashboard/:postOfficeId/posts/new" element={<PostForm />} />
>>>>>>> 4427415e3d294213b99ffa6e30be283bce93ad52
      </Routes>
    </Router>
  );
};

export default App;