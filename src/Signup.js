import React from 'react'
import "./stylesheets/signup.css";


function Signup() {
  return (
    <div className="signup">
      <h2>Sign up</h2>
      <div className="signup--card">
        <input type="text" placeholder="full name" />
        <input type="text" placeholder="email address" />
        <input type="password" placeholder="password" />
        <button>Submit</button>
      </div>
    </div>
  );
}

export default Signup