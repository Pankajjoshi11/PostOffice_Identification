<<<<<<< HEAD
// App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import SignUpMain from './pages/SignUpMain';
import Main from './pages/Main';
//import Dashboard from './components/Dashboard';
//import EditAddress from './pages/EditAddressForm'; // Ensure this path is correct
import Employees from './pages/Employees';
import Packages from './pages/Packages';
import Schedule from './pages/Schedule';
import Settings from './pages/Settings';
import UpdateAddressPage from './components/UpdateAddressPage'; // Ensure this path is correct

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUpMain from './pages/SignUpMain'
import Main from './pages/Main'
import Dashboard from './components/Dashboard'
import EditAddress from './pages/editAdress'
// import Employees from './pages/Employees'
// import Packages from './pages/Packages'
// import Schedule from './pages/Schedule'
// import Settings from './pages/Settings'
// import AddressForm from './pages/EditAdressForm'


>>>>>>> c390bb0a5c7c8c606c4fd0c3c13ae29c8967e068

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpMain />} />
<<<<<<< HEAD
        <Route path="/update-address/:consignmentNo" element={<UpdateAddressPage />} />
        {/* Uncomment these lines if you need them later */}
        {/* <Route path="/edit-address/:uniqueId" element={<EditAddress />} /> */}
        <Route path="/employees" element={<Employees />} />
=======
        <Route path="/update-address/:uniqueId" element={<EditAddress />} />
        {/* <Route path="/employees" element={<Employees />} />
>>>>>>> c390bb0a5c7c8c606c4fd0c3c13ae29c8967e068
        <Route path="/packages" element={<Packages />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
