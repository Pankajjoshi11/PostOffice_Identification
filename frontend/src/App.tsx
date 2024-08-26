import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUpMain from './pages/SignUpMain'
import Main from './pages/Main'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpMain />} />
          <Route path="/" exact component={AddressForm} />
          <Route path="/address/:id" component={AddressDetails} />
         
          
        </Routes>
      </Router>
    </>
  )
}

export default App
