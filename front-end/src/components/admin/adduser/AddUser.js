import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import axios from "../../../axios/axios";




const AddUser = () => {
    const navigate = useNavigate();
  const auth = useSelector((state) => state);
  const [error, setError] = useState({});
  const [formValue, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValue, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("/signup", {
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        confirm_password: formValue.confirm_password,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Image uploaded successfully")
        navigate("/admin/home");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
      });
  };


  return (
    <div>
        <Navbar/>
        <ToastContainer />
        <section className="vh-100">
        <div className="container  h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Create User</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label float-start">Name</label>
                      <input
                        type="name"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        onChange={onChangeHandle}
                        value={formValue.name}
                        name="name"
                      />
                      {error && <p style={{ color: "red" }}>{error.name}</p>}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label float-start">Email</label>
                      <input
                        type="email"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        onChange={onChangeHandle}
                        value={formValue.email}
                        name="email"
                      />
                      {error && <p style={{ color: "red" }}>{error.email}</p>}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label float-start">Password</label>
                      <input
                        type="password"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        value={formValue.password}
                        onChange={onChangeHandle}
                        name="password"
                      />
                      {error && (
                        <p style={{ color: "red" }}>{error.password}</p>
                      )}
                    </div>

                  
                    <button
                      className="btn btn-primary btn-lg btn-block mb-3"
                      type="submit"
                    >
                      Create account
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      
    </div>
  )
}

export default AddUser
