import { Navigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import LoaderSpinner from "../Components/LoaderSpinner";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center p-10 font-medium"><LoaderSpinner/></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
