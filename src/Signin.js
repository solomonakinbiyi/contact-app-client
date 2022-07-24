import React from "react";
import "./stylesheets/signin.css";

function Signin() {
  return (
    <div className="signin">
      <h2>Sign in</h2>
      <div className="signin--card">
        <input type="text" placeholder="email address" />
        <input type="password" placeholder="password" />
        <button>Log in</button>
      </div>
    </div>
  );
}

export default Signin;
