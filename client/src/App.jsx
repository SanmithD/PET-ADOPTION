import { Route, Routes } from 'react-router-dom';
import Admin from './Admin/AdminRoute/Admin';
import './App.css';
import Footer from './Components/Footer';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import ResetPassword from './Components/ResetPassword';
import Signup from './Components/Signup';
import User from './User/UserRoute/User';

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<ProtectedRoute> <User/></ProtectedRoute>}/>
        <Route path='/admin/*' element={<ProtectedRoute><Admin/> </ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/reset' element={<ResetPassword/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
