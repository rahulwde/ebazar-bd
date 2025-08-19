// PrivateRoute.jsx
import { useContext } from "react";
  
// import Loader from "./Loader";
 import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../../Context/Authcontext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // if (loading) return   <Loader></Loader>
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
