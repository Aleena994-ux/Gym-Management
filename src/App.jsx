
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './common/pages/LandingPage'
import Auth from './common/pages/Auth'
import Services from './common/pages/Services'
import AdminHome from './admin/pages/AdminHome'
import AdminUser from './admin/pages/AdminUser'
import AdminTrainer from './admin/pages/AdminTrainer'
import AdminPayment from './admin/pages/AdminPayment'
import UserHome from './user/pages/UserHome'
import UserRequest from './user/pages/UserRequest'
import UserChat from './user/pages/UserChat'
import TrainerHome from './trainer/pages/TrainerHome'
import AssignedUsers from './trainer/pages/AssignedUsers'
import TrainerChat from './trainer/pages/TrainerChat'
import WorkoutPlan from './trainer/pages/WorkoutPlan'
import UserWorkoutPlan from './user/pages/UserWorkoutPlan'
import { ToastContainer } from 'react-toastify'
import AdminEnquiry from './admin/pages/AdminEnquiry'

function App() {
 

  return (
    <>
  <Routes>
    {/* common */}
  <Route path='/' element={<LandingPage/>}/>
  <Route path='/services' element={<Services/>}/>
  <Route path="/login" element={<Auth />} />
  <Route path="/register" element={<Auth register/>} />

  {/* admin */}
   <Route path="/admin-home" element={<AdminHome />} />
    <Route path="/admin-enquiry" element={<AdminEnquiry />} />
     <Route path="/admin-trainer" element={<AdminTrainer/>} />
     <Route path="/admin-payment" element={<AdminPayment/>} />
     <Route path="/admin-user" element={<AdminUser/>} />

     {/* user */}
     <Route path="/user-home" element={<UserHome/>} />
     <Route path="/user-request" element={<UserRequest/>} />
     <Route path="/user-chat" element={<UserChat/>} />
      <Route path="/user-workoutplan" element={<UserWorkoutPlan/>} />

     {/* trainer */}
      <Route path="/trainer-home" element={<TrainerHome/>} />
       <Route path="/assigned-users" element={<AssignedUsers/>} />
       <Route path="/workout-plan" element={<WorkoutPlan/>} />
        <Route path="/trainer-chat" element={<TrainerChat/>} />
        
  </Routes>
  <ToastContainer
        position = 'top-center'
        autoClose ={2000}
        theme = 'colored'
        />

    </>
  )
}

export default App
