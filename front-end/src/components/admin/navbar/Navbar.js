import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {useNavigate} from 'react-router'
import {removetoken} from '../../../Redux/token'
import { useDispatch } from 'react-redux'



const Navbar = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = (e)=>{
        e.preventDefault()
        dispatch(removetoken())
        navigate('/admin')
    }

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand">Admin Panel</a>
      <form className="d-flex">
      <button onClick={logoutHandler} className="btn btn-outline-danger" type="submit">LOGOUT</button>
    </form>
  </div>
</nav>
    </div>
  )
}

export default Navbar
