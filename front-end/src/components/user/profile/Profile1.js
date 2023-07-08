import React, { useEffect, useState } from 'react'
import axios from '../../../axios/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Home from '../home/Home'



const Profile1 = () => {
  const baseImgUrl = "http://localhost:3005/"
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [image,setImage]=useState('')
  const [imageSrc,setImageSrc]=useState('')
  const token = useSelector((state)=>state.token)
  

  const imagePath = token.imagePath
  const nameValue = token.name
  const emailValue = token.email
  


  useEffect(()=>{
    setImageSrc(imagePath)
    setName(nameValue)
    setEmail(emailValue)
    
  },[imagePath])

  console.log("image path in profile is ",imagePath)

  const uploadImage = (e) => {   
    
    e.preventDefault();
    const formData = new FormData();
    formData.append('id',token.id); 
    formData.append('image',image);
    axios
      .post('/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {    
       console.log(res.data)
       toast.success("Image uploaded successfully")
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    
<div>

  <Home />
             
    <ToastContainer />
      <div className="container-xl px-4 mt-4">
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                  className="img-account-profile rounded-circle mb-2"
                  style={{ objectFit: "contain", width: "300px" }}
                  src={
                    image
                      ? URL.createObjectURL(image) :
                    imageSrc ? (baseImgUrl + imageSrc ):('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
                  }
                  alt=""
                />
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <button
                  className="btn btn-primary"
                  onClick={uploadImage}
                  type="button"
                >
                  Upload new image
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Edit Profile</div>
              <div className="card-body">
                <form>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        User name
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3"></div>

                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>

                  
                  
                  {isLoading ? (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status"></div>
                    </div>
                  ) : (
                    <div className="d-grid gap-2 mt-3">
                      <button
                        className="btn btn-primary"
                        
                        type="button"
                      >
                        Save changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default Profile1
