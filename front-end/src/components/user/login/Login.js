import React, {  useEffect, useState } from 'react'
// import './login.css'
import { useNavigate} from 'react-router-dom'
import axios from '../../../axios/axios'
import {Link} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { storetoken}  from '../../../Redux/token'
import { useDispatch, useSelector } from 'react-redux'



const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const auth = useSelector((state)=>state.token.token)

  useEffect(()=>{
    if(auth!==''){
      
      navigate('/')
    }
  },[auth])
 

  const [error,] = useState({})
  const [loginform,setloginform] = useState({
    email:"",
    password:""
  })

  const onChangeHandle = (e) =>{
    const {name,value} = e.target
    setloginform({...loginform,[name]:value})
  }
 
  const handleSubmit = async(e)=>{
    e.preventDefault()
    await axios.post('/login',{
      email:loginform.email,
      password:loginform.password
    }).then((response)=>{
      const {email,id,name,token,imagePath} = response.data
      const userData = {email,id,name,token,imagePath}
      console.log("The user data is ",userData)
      dispatch(storetoken(response.data))
      navigate('/')
    }).catch((error)=>{
      console.log(error)
    })
  }



  return (
    <div >
     <section className="vh-100">
  <form onSubmit={handleSubmit}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" >
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Login here</h3>

            <div className="form-outline mb-4">
            <label className="form-label float-start">Email</label>
              <input type="email"
               id="typeEmailX-2" 
               className="form-control form-control-lg" 
                 onChange={onChangeHandle}
                 value={loginform.email} 
                  name="email"/>
                   {error && <p style={{color:"red"}}>{error.email}</p>}
            </div>

            <div className="form-outline mb-4">
            <label className="form-label float-start">Password</label>
              <input
               type="password" 
               id="typePasswordX-2"
              className="form-control form-control-lg"
              onChange={onChangeHandle}
              value={loginform.password}
                name="password" />
           {error && <p style={{color:"red"}}>{error.password}</p>}
            </div>

        
          

            <button className="btn btn-primary btn-lg btn-block mb-3" type="submit">Login</button>

    <p >Don't have an account?<Link className='ms-1' to='/signup'>Click Here</Link> </p>
      

          </div>
        </div>
      </div>
    </div>
  </div>
  </form>
</section>
      
    </div>
  )
}

export default Login
