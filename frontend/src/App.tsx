import './App.css';
import Login from './pages/Login';
import SignUpMain from './pages/SignUpMain';
import Main from './pages/Main';
import EditAddress from './pages/editAdress'; // Ensure correct import name
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpMain />} />
        <Route path="/update-address/:uniqueId" element={<EditAddress />} />
      </Routes>
    </Router>
  );
}

export default App;
