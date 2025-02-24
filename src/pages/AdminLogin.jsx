import React, { useEffect, useState } from "react";
import { LogIn, User, Lock } from "lucide-react";
import axiosInstance from "../cors/axiousInstence";
import { useNavigate } from "react-router-dom";
import validateCredentials from "../util/validation";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [globalErr, setGlobalErr] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Check if the admin is already authenticated
    const checkAdminAuth = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:4000/api/verify", {
          withCredentials: true,
        });

        if (response.status === 200) {
          navigate("/adminHome", { replace: true });
        }else if(response.status ===401){
          navigate("/adminHome", { replace: true });
        }
      } catch (error) {
        console.log("Admin not authenticated");
      }
    };

    checkAdminAuth();
  }, [navigate]);

  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { isValid, errors } = validateCredentials(formData);
      if (isValid) {
        const response = await axiosInstance.post(
          "http://localhost:4000/api/adminLogin",
          formData,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log("Login successful:", response.data);
        navigate("/adminHome", { replace: true });
      } else {
        setErrors(errors);
      }
    } catch (error) {
      console.log("Login failed", error.response?.data?.message);
      setGlobalErr(error.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-amber-900 text-center">Admin Login</h2>
        <p className="text-gray-600 mt-2 text-center">Nice Door World Management Portal</p>

        <form onSubmit={handleLogin} className="space-y-6 mt-6">
          {globalErr && <p className="text-red-500 text-xs text-center">{globalErr}</p>}

          <div className="relative">
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-800" />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="relative">
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-800" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-800 text-white py-2 rounded-md hover:bg-amber-700 transition flex items-center justify-center"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
