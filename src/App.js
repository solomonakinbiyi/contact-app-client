import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Signin from './Signin';
import Signup from './Signup';
import Profile from './Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
