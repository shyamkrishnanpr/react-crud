import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../axios/axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state);
  const [errors, setError] = useState({});
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
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data);
      });
  };

  return (
    <div>
      
      <section className="vh-100">
        <div className="container  h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong">
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Signup</h3>
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
                      {errors && <p style={{ color: "red" }}>{errors.name}</p>}
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
                      {errors && <p style={{ color: "red" }}>{errors.email}</p>}
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
                      {errors && (
                        <p style={{ color: "red" }}>{errors.password}</p>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label float-start">
                        conform password
                      </label>
                      <input
                        type="password"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        value={formValue.confirm_password}
                        onChange={onChangeHandle}
                        name="confirm_password"
                      />
                      {errors && (
                        <p style={{ color: "red" }}>{errors.confirm_password}</p>
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
  );
};

export default Signup;
