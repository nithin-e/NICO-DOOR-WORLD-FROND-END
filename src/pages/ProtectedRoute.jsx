import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../cors/axiousInstence";

const ProtectedRoute = ({ element: Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:4000/api/verifyAdmin", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>; 

  return isAuthenticated ? <Element /> : <Navigate to="/adminLoginPage" />;
};

export default ProtectedRoute;
