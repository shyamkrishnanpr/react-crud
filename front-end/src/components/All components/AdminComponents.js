import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Login from '../admin/login/Login'
import UserManagement from '../admin/userManagement/UserManagement'
import AddUser from '../admin/adduser/AddUser'


const AdminComponents = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/admin' element={ <Login /> } ></Route>
                <Route path='/admin/home' element={ <UserManagement /> } ></Route>
                <Route path='/admin/adduser' element={<AddUser/>}></Route>

            </Routes>
        </Router>
      
    </div>
  )
}

export default AdminComponents
