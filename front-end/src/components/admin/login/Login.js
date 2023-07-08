import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from '../../../axios/axios'
import {useNavigate} from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import {storetoken} from '../../../Redux/token'


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useSelector((state)=>state.token.token)

  useEffect(()=>{
    if(auth!==''){
      
      navigate('/admin/home')
    }
  },[auth])


    const [error,setError] = useState({})
    const [adminAuth,setAdminAuth] = useState({
        email:"",
        password:""
    })

    const onChangeHandle = ((e)=>{
        const {name,value} = e.target
        setAdminAuth({...adminAuth,[name]:value})
    })

    const submitHandler = (async(e)=>{
        e.preventDefault();
        await axios.post('/admin',{
            email:adminAuth.email,
            password:adminAuth.password
        }).then (async(response)=>{
            const data = {
                token : response.data.token,
                email : response.data.email
            }
            

            dispatch(storetoken(data))
            navigate('/admin/home')
        }).catch((error)=>{
            console.log(error)

        })
    })



  return (
    <div>
      <section className="vh-100">
  <form onSubmit={submitHandler}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" >
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Admin Login</h3>

            <div className="form-outline mb-4">
            <label className="form-label float-start">Email</label>
              <input type="email"
               id="typeEmailX-2" 
               className="form-control form-control-lg" 
               onChange={onChangeHandle}
               value={adminAuth.email}
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
              value={adminAuth.password}
                name="password" />
                    {error && <p style={{color:"red"}}>{error.password}</p>}
            </div>

        
            
            <button className="btn btn-primary btn-lg btn-block mb-3" type="submit">Login</button>


      

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
