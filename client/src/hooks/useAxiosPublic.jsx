import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://b10a11-server-side-mdtayef001.vercel.app",
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
