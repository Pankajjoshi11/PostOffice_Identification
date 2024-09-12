import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUpMain from './pages/SignUpMain'
import Main from './pages/Main'
//import Dashboard from './components/Dashboard'
//import EditAddress from '..//edit'
//import Employees from './pages/Employees'
import Packages from './pages/Packages'
import UpdatePostPage from './pages/UpdatePostPage'
//import Schedule from './pages/Schedule'
//import AddressForm from './pages/EditAdressForm'




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpMain />} />
        {/*
        <Route path="/update-address/:consignmentNo" element={<UpdatePostPage />} />
       */}
        {/*<Route path="/employees" element={<Employees />} />*/}
        <Route path="/packages" element={<Packages />} />
        
      </Routes>
    </Router>
  );
}

export default App;