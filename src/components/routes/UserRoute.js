import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";

const UserRoute = ({ children }) => {
  const [state, setState] = useContext(UserContext);

  const [ok, setOk] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`/current-user`);
      if (data.ok) setOk(true);
    } catch (error) {
      navigate("/");
    }
  };

  typeof window === "object" &&
    state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return !ok ? "loading..." : <>{children}</>;
};

export default UserRoute;
