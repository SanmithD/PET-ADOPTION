import { Route, Routes } from 'react-router-dom';
import Admin from './Admin/AdminRoute/Admin';
import './App.css';
import Footer from './Components/Footer';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import Signup from './Components/Signup';
import User from './User/UserRoute/User';

function App() {

  // const navigate = useNavigate();
  // const token = localStorage.getItem('token');

  // if(!token){
  //   navigate('/login');
  // }

  return (
    <>
      <Routes>
        <Route path='/*' element={<ProtectedRoute> <User/></ProtectedRoute>}/>
        <Route path='/admin/*' element={<Admin/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
