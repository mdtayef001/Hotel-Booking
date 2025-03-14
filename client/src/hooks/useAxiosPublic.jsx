import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://hotel-booking-sever.vercel.app",
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
