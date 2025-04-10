import React from 'react'
import {Route, Routes} from 'react-router-dom'
import ProtectedRoute from '../components/Protected/ProtectedRoute'
import Register from '../views/user/signup/Register'
import LoginForm from '../views/user/login/Login'
import AdminLogin from '../views/admin/adminLogin'
import AdminProfile from '../views/admin/adminProfile'
import ProfilePage from '../views/instructor/profile'

const Approutes = () => {
  return (
    <>
            <Routes>
                      {/* user routes */}
                    <Route path='/signup' element={<Register />} />
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/profile' element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>} />


                    <Route path='/instructorprofile' element={ <ProfilePage /> } />

                    {/* admin routes */}
                    <Route path='/admin/login' element={<AdminLogin />} />
                    <Route path='/admin/profile' element={<AdminProfile />} />


            </Routes>
    </>
  )
}

export default Approutes