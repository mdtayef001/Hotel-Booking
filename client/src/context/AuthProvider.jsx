import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const disconnect = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      try {
        const res = await axiosPublic.post("/jwt", {
          email: currentUser.email,
        });

        if (res?.data) {
          localStorage.setItem("access-token", res?.data);
        } else {
          localStorage.removeItem("access-token");
        }
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    });

    return () => disconnect;
  }, []);

  const userInfo = {
    user,
    loading,
    logOut,
    loginUser,
    createUser,
    loginWithGoogle,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthProvider;
