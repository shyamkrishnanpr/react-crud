import React from 'react'
import Signup from '../user/signup/Signup'
import Login from '../user/login/Login'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from '../user/home/Home'
import Profile1 from '../user/profile/Profile1'




const UserComponents = () => {
  return (
    <div>
        <Router>
            <Routes>

                <Route path='/signup' element={<Signup/> } ></Route>
                <Route path='/login' element={<Login/> } ></Route>
                <Route path='/' element={<Home /> } ></Route>
                <Route path='/profile1' element={<Profile1 /> } ></Route>
                
                
            </Routes>
        </Router>
      
    </div>
  )
}

export default UserComponents
