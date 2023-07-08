import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removetoken } from '../../../Redux/token'
import './home.css'
import {Link} from 'react-router-dom'


const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state)=>state.token)
  console.log("The token in home is ",token)


  const logoutHandler = (e)=>{
    e.preventDefault()
    dispatch(removetoken()) 
    navigate('/')
  }

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand">Home</a>
    {
      token.token && <Link className='ms-1' to='/profile1'>PROFILE</Link> 
    }
    
    
    <form className="d-flex">
   
      {
        token.token ? (<button onClick={logoutHandler} className="btn btn-outline-danger" type="submit">Logout</button>):
        (<button onClick={()=>navigate('/login')} className="btn btn-outline-success" type="submit">Login/Register</button>)
      }
      
    </form>
  </div>
</nav>      
    </div>
  )
}

export default Home
