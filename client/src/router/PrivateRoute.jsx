import PropTypes from "prop-types";
import UseAuth from "../hooks/UseAuth";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { loading, user } = UseAuth();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/auth/login"} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.object,
};

export default PrivateRoute;
