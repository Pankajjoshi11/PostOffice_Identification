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
<<<<<<< HEAD
          {/* <Route path="/editaddress" element={<AddressForm />} /> */}
=======
    
>>>>>>> 92fca39264b6bd68e3da223775ae973dc9e72560
         
          
        </Routes>
      </Router>

      
    </>
  )
}

export default App
