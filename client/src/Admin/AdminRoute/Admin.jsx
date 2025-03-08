import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../../Components/Login";
import Signup from "../../Components/Signup";
import Profile from "../../User/UserComponent/Profile";
import Contact from "../AdminComponent/Contact";
import Dashboard from "../AdminComponent/Dashboard";
import ManageNotifications from "../AdminComponent/ManageNotifications";
import ManagePets from "../AdminComponent/ManagePets";
import ManageRequest from "../AdminComponent/ManageRequest";
import PostNotification from "../AdminComponent/PostNotification";
import ViewFeedback from "../AdminComponent/ViewFeedback";

function Admin() {

  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  if(!token){
    navigate('/adminLogin')
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/postNotification/:id" element={<PostNotification />} />
          <Route path="/postNotification" element={<PostNotification />} />
          <Route path="/manageRequest" element={<ManageRequest />} />
          <Route path="/viewFeedback" element={<ViewFeedback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reply" element={<Contact />} />
          <Route path="/postNewPet" element={<ManagePets />} />
          <Route path="/manageNotification" element={<ManageNotifications />} />
          <Route path="/adminLogin" element={<Login />} />
          <Route path="/adminSignup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Admin;
