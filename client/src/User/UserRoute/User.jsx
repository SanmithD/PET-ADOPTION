import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from '../../Components/Login';
import ProtectedRoute from '../../Components/ProtectedRoute';
import Signup from '../../Components/Signup';
import Adopt from '../UserComponent/Adopt';
import Blog from '../UserComponent/Blog';
import Donation from '../UserComponent/Donation';
import Feedback from '../UserComponent/Feedback';
import Home from '../UserComponent/Home';
import Message from '../UserComponent/Message';
import Navbar from '../UserComponent/Navbar';
import Notification from '../UserComponent/Notification';
import PetDetails from '../UserComponent/PetDetails';
import Profile from '../UserComponent/Profile';
import View from '../UserComponent/View';
import VisionMission from '../UserComponent/VisionMission';

function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token && location.pathname !== '/signup' ) {
      navigate('/login');
    }
  }, [token, navigate, location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={ <ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/notification/:id' element={<Notification />} />
        <Route path='/donation' element={<Donation />} />
        <Route path='/adopt' element={<Adopt />} />
        <Route path='/view' element={<View />} />
        <Route path='/petDetails/:id' element={<PetDetails />} />
        <Route path='/contact' element={<Message />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/vision-mission' element={<VisionMission />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </>
  );
}

export default User;
