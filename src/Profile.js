import React, { useState } from "react";
import "./stylesheets/profile.css";

function Profile() {
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowAdd, setModalShowAdd] = useState(false);

  const showModalEdit = () => {
    setModalShowEdit(true);
  };

  const showModalAdd = () => {
    setModalShowAdd(true);
  };

  return (
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
            <tr className="table--data--rows">
              <td>Name</td>
              <td>Email Address</td>
              <td>House Address</td>
              <td>Phone</td>
              <td>
                <button className="table--btn--edit" onClick={showModalEdit}>
                  Edit
                </button>
              </td>
              <td>
                <button className="table--btn--del">Delete</button>
              </td>
            </tr>
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
      <div
        className="edit--contact--modal"
        style={{ display: modalShowEdit ? "grid" : "none" }}
      >
        <div className="edit--contact--form">
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
          <div style={{margin: '0 auto', width: 'fit-content'}}>
            <button className="btn--add--modal">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
