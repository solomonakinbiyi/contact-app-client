import React, { useState, useContext, useEffect } from "react";
import "./stylesheets/profile.css";
import UserRoute from "./components/routes/UserRoute";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context";
import { toast } from "react-toastify";
import axios from "axios";

function Profile() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [houseaddress, setHouseAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [owneremail, setOwnerEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [contacts, setContacts] = useState([]);

  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowAdd, setModalShowAdd] = useState(false);

  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const showModalEdit = (i, n, e, h, p, o) => {
    setId(i);
    setName(n);
    setEmail(e);
    setHouseAddress(h);
    setPhone(p);
    setOwnerEmail(o);

    setModalShowEdit(true);
  };

  const closeModalEdit = () => {
    setModalShowEdit(false);
    setId("");
    setName("");
    setEmail("");
    setHouseAddress("");
    setPhone("");
    setOwnerEmail("");
  };

  const updateDetails = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.put(`/update-contact/${owneremail}`, {
        name,
        email,
        phone,
        houseaddress,
        owneremail,
        id,
      });
      if (data.error) {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      } else {
        toast.info(data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (state && state.token) {
          getAllUserContacts(state.user, state.token);
        }

        setLoading(false);
      }
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
  };

  const deleteContact = async (owneremail, id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `/delete-contact/${owneremail}/${id}`
      );
      if (data.error) {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      } else {
        toast.info(data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (state && state.token) {
          getAllUserContacts(state.user, state.token);
        }

        setLoading(false);
      }
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
  };

  const showModalAdd = () => {
    setModalShowAdd(true);
  };

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    toast.info("Loggedout successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/");
  };

  const getAllUserContacts = async (email, token) => {
    try {
      const { data } = await axios.get(`/get-all-contacts/${email}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state && state.token) {
      getAllUserContacts(state.user, state.token);
    }
  }, [state && state.user]);

  return (
    <UserRoute>
      <div className="profile">
        <h2>Manage Contacts</h2>
        <div className="contacts--table--wrp">
          <table>
            <thead>
              <tr className="table--header">
                <th>Name</th>
                <th>Email Address</th>
                <th>House Address</th>
                <th>Phone</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contacts &&
                contacts.map((c) => (
                  <tr className="table--data--rows" key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.houseaddress}</td>
                    <td>{c.phone}</td>
                    <td>
                      <button
                        className="table--btn--edit"
                        onClick={() =>
                          showModalEdit(
                            c.id,
                            c.name,
                            c.email,
                            c.houseaddress,
                            c.phone,
                            c.owneremail
                          )
                        }
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="table--btn--del"
                        disabled={loading}
                        style={{
                          backgroundColor: loading && "#720505",
                          cursor: loading && "not-allowed",
                        }}
                        onClick={() => deleteContact(c.owneremail, c.id)}
                      >
                        {loading ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <button
          className="btn--add--new"
          onClick={showModalAdd}
          style={{ cursor: "pointer" }}
        >
          Add new contact
        </button>
        <button
          className="btn--add--new"
          style={{ backgroundColor: "blue", color: "white" }}
          onClick={logout}
        >
          Logout
        </button>
        <div
          className="edit--contact--modal"
          style={{ display: modalShowEdit ? "grid" : "none" }}
        >
          {/* <div className="edit--contact--form">
            <div className="edit--contact--form--top">
              <h2 className="edit--label">Edit Contact</h2>
              <h2 className="close--modal">
                <i
                  className="bi bi-x-lg"
                  onClick={() => setModalShowEdit(false)}
                  style={{ cursor: "pointer" }}
                ></i>
              </h2>
            </div>
            <div className="edit--contact--form--cnt">
              <input type="text" />
              <button>Submit</button>
            </div>
          </div> */}
          <div className="add--contact--form">
            <div className="add--contact--form--top">
              <h2 className="add--label">Edit Contact</h2>
              <h2 className="close--modal">
                <i
                  className="bi bi-x-lg"
                  onClick={() => closeModalEdit()}
                  style={{ cursor: "pointer" }}
                ></i>
              </h2>
            </div>
            <form onSubmit={updateDetails}>
              <div className="add--contact--form--cnt">
                <input
                  type="text"
                  placeholder="full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="add--contact--form--cnt">
                <input
                  type="email"
                  placeholder="email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="add--contact--form--cnt">
                <input
                  type="text"
                  placeholder="house address"
                  value={houseaddress}
                  onChange={(e) => setHouseAddress(e.target.value)}
                />
              </div>
              <div className="add--contact--form--cnt">
                <input
                  type="tel"
                  placeholder="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div style={{ margin: "0 auto", width: "fit-content" }}>
                <button
                  className="btn--add--modal"
                  disabled={loading}
                  style={{
                    backgroundColor: loading && "#001c00",
                    cursor: loading && "not-allowed",
                  }}
                >
                  {loading ? "Updating..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Add new contact modal */}
        <div
          className="add--contact--modal"
          style={{ display: modalShowAdd ? "grid" : "none" }}
        >
          <div className="add--contact--form">
            <div className="add--contact--form--top">
              <h2 className="add--label">Add Contact</h2>
              <h2 className="close--modal">
                <i
                  className="bi bi-x-lg"
                  onClick={() => setModalShowAdd(false)}
                  style={{ cursor: "pointer" }}
                ></i>
              </h2>
            </div>
            <div className="add--contact--form--cnt">
              <input type="text" placeholder="full name" />
            </div>
            <div className="add--contact--form--cnt">
              <input type="email" placeholder="email address" />
            </div>
            <div className="add--contact--form--cnt">
              <input type="text" placeholder="house address" />
            </div>
            <div className="add--contact--form--cnt">
              <input type="tel" placeholder="phone" />
            </div>
            <div style={{ margin: "0 auto", width: "fit-content" }}>
              <button className="btn--add--modal">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  );
}

export default Profile;
