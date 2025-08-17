import { Route, Routes } from 'react-router-dom'
import Profile from '../../User/UserComponent/Profile'
import Contact from '../AdminComponent/Contact'
import Dashboard from '../AdminComponent/Dashboard'
import ManageNotifications from '../AdminComponent/ManageNotifications'
import ManagePets from '../AdminComponent/ManagePets'
import ManageRequest from '../AdminComponent/ManageRequest'
import PostNotification from '../AdminComponent/PostNotification'
import ViewFeedback from '../AdminComponent/ViewFeedback'

function Admin() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard/>}>
        <Route path='/postNotification/:id' element={<PostNotification/>}/>
        <Route path='/postNotification' element={<PostNotification/>}/>
        <Route path='/manageRequest' element={<ManageRequest/>}/>
        <Route path='/viewFeedback' element={<ViewFeedback/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/reply' element={<Contact/>}/>
        <Route path='/postNewPet' element={<ManagePets/>}/>
        <Route path='/manageNotification' element={<ManageNotifications/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default Admin