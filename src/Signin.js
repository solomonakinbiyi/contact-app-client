import React, { useState, useContext } from "react";
import "./stylesheets/signin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context";


function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [state, setState] = useContext(UserContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/signin`, {
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
        toast.success("Loggedin successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setEmail("");
        setPassword("");
        setLoading(false);

        // update context
        setState({
          user: data.user,
          token: data.token,
        });

        // save in local storage
        window.localStorage.setItem("auth", JSON.stringify(data));

        navigate("/profile");
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
    <div className="signin">
      <h2>Sign in</h2>
      <div className="signin--card">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
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
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <Link to="/signup">
          <button
            style={{
              backgroundColor: "transparent",
              border: "1px solid orange",
            }}
          >
            Create account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Signin;
