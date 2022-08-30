import React, { useState, useContext } from "react";
import "./stylesheets/signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [state] = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/signup`, {
        name,
        email,
        password,
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
        toast.success("Account successfully created", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setName("");
        setEmail("");
        setPassword("");
        setLoading(false);
        navigate("/");
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

  if (state && state.token) navigate("/profile");

  return (
    <div className="signup">
      <h2>Sign up</h2>
      <div className="signup--card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={loading}
            style={{
              backgroundColor: loading && "rgb(108 10 63)",
              cursor: loading && "not-allowed",
            }}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
        <Link to="/">
          <button
            style={{
              backgroundColor: "transparent",
              border: "1px solid orange",
            }}
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
