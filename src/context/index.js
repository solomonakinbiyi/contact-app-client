import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {},
    token: "",
  });

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
  }, []);

  const navigate = useNavigate();

  const token = state && state.token ? state.token : "";

  axios.defaults.baseURL =
    "https://contact-app-server-2fs2.onrender.com/api";
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setState(null);
        window.localStorage.removeItem("auth");
        navigate("/");
      }
    }
  );

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
