import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUpMain from './pages/SignUpMain'
import Main from './pages/Main'
// import AddressForm from './pages/EditAdressForm'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpMain />} />
          {/* <Route path="/editaddress" element={<AddressForm />} /> */}
         
          
        </Routes>
      </Router>
    </>
  )
}

export default App
