import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

const instance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://hotel-booking-sever.vercel.app",
});
const useAxiosSecure = () => {
  const { logOut } = UseAuth();
  const navigate = useNavigate();

  // all secure req
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        logOut();
        navigate("/auth/login");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosSecure;
