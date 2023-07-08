import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../../axios/axios";

const UserManagement = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.token.token);
  const [users, setUsers] = useState([]);
  const [block, setBlock] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilterdUsers] = useState([]);

  useEffect(() => {
    if (auth) {
      axios.get("/admin/getUser").then((response) => {
        setUsers(response.data.AllUsers);
      });
    } else {
      navigate("/admin");
    }
  }, [auth]);

  const BlockUser = async (userId) => {
    try {
      await axios.post(`admin/blockuser/${userId}`);
      setBlock((prev) => {
        return {
          ...prev,
          [userId]: true,
        };
      });
      const response = await axios.get("/admin/getUser");
      const allUsers = response.data.AllUsers || [];
      setUsers(allUsers);

      if (search !== "") {
        const list = allUsers.filter((value) => value.name.includes(search));
        setFilterdUsers(list);
      }
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const unBlockUser = async (userId) => {
    try {
      await axios.post(`admin/unblockuser/${userId}`);
      setBlock((prev) => {
        return {
          ...prev,
          [userId]: false,
        };
      });
      const response = await axios.get("/admin/getUser");
      const allUsers = response.data.AllUsers || [];
      setUsers(allUsers);

      if (search !== "") {
        const list = allUsers.filter((value) => value.name.includes(search));
        setFilterdUsers(list);
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const onChangeSearchUser = (e) => {
    const searchData = e.target.value;
    setSearch(searchData);
    if (searchData !== "") {
      const list = users.filter((value) => value.name.includes(searchData));
      setFilterdUsers(list);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container " style={{ marginTop: 10 }}>
        <nav className="navbar navbar-light ">
          <div col-md-4 className="container-fluid">
            <a className="navbar-brand">User Details..</a>
            <div col-md-6 style={{ display: "flex" }}>
              <input
                className="form-control me-2"
                onChange={onChangeSearchUser}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success">Search</button>
            </div>

            <div col-md-2>
              <button
                onClick={() => navigate("/admin/adduser")}
                className="btn btn-outline-success "
              >
                Add User
              </button>
            </div>
          </div>
        </nav>
        <hr></hr>

        <table className="table ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">id</th>
              <th scope="col">Edit</th>
              <th scope="col">Block user</th>
            </tr>
          </thead>

          {search === "" &&
            users.map((obj, index) => {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {obj.isBlocked || block[obj._id] ? (
                        <span className="text-danger fw-bolder ms-2 mt-1">
                          {obj.name}
                        </span>
                      ) : (
                        obj.name
                      )}
                    </td>
                    <td>
                      {" "}
                      {obj.isBlocked || block[obj._id] ? (
                        <span className="text-danger fw-bolder ms-2 mt-1">
                          {obj.email}
                        </span>
                      ) : (
                        obj.email
                      )}
                    </td>
                    <td>
                      {" "}
                      {obj.isBlocked || block[obj._id] ? (
                        <span className="text-danger fw-bolder ms-2 mt-1">
                          {obj._id}
                        </span>
                      ) : (
                        obj._id
                      )}
                    </td>

                    <td>
                      <button className="btn btn-primary">Edit</button>
                    </td>
                    {obj.isBlocked === true ? (
                      <td>
                        <button
                          onClick={() => unBlockUser(obj._id)}
                          className="btn btn-success"
                        >
                          unblock
                        </button>
                      </td>
                    ) : (
                      <td>
                        <button
                          onClick={() => BlockUser(obj._id)}
                          className="btn btn-danger"
                        >
                          Block
                        </button>
                      </td>
                    )}
                  </tr>
                </tbody>
              );
            })}

          {search !== "" &&
            filteredUsers.map((obj, index) => {
              return (
                <tbody key={obj._id}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {obj.isBlocked || block[obj._id] ? (
                        <span className="text-danger fw-bolder ms-2 mt-1">
                          {obj.name}
                        </span>
                      ) : (
                        obj.name
                      )}
                    </td>
                    <td>
                      {" "}
                      {obj.isBlocked || block[obj._id] ? (
                        <span className="text-danger fw-bolder ms-2 mt-1">
                          {obj.email}
                        </span>
                      ) : (
                        obj.email
                      )}
                    </td>
                    <td>
                      {" "}
                      {obj.isBlocked || block[obj._id] ? (
                        <span className="text-danger fw-bolder ms-2 mt-1">
                          {obj._id}
                        </span>
                      ) : (
                        obj._id
                      )}
                    </td>

                    <td>
                      <button className="btn btn-primary">Edit</button>
                    </td>
                    {obj.isBlocked === true ? (
                      <td>
                        <button
                          onClick={() => unBlockUser(obj._id)}
                          className="btn btn-success"
                        >
                          unblock
                        </button>
                      </td>
                    ) : (
                      <td>
                        <button
                          onClick={() => BlockUser(obj._id)}
                          className="btn btn-danger"
                        >
                          Block
                        </button>
                      </td>
                    )}
                  </tr>
                </tbody>
              );
            })}

          {filteredUsers.length === 0 && search !== "" && (
            <div className="d-flex w-100">
              <h3 className="justify-content-center">No result</h3>
            </div>
          )}
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
