import React from 'react';
import { Home, Package, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../cors/axiousInstence';
import toast from 'react-hot-toast';
import { Logo } from '../Components/Logo'; 

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/logOut",
        {},
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      toast.success("Logout Completed Successfully");
      navigate('/adminLoginPage', { replace: true });
    } catch (error) {
      console.error("❌ Logout Error:", error);
      toast.error("Logout failed! Please try again.");
    }
  };

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center flex-wrap">
      {/* Use the Logo Component Here */}
      <Logo />

      <div className="flex items-center space-x-4 flex-wrap sm:flex-nowrap">
        <button 
          onClick={() => navigate('/adminHome')} 
          className="flex items-center text-amber-900 hover:bg-amber-100 px-3 py-2 cursor-pointer rounded-md"
        >
          <Home className="mr-2 h-5 w-5" />
          Dashboard
        </button>
        <button 
          onClick={() => navigate('/adminHome')} 
          className="flex items-center text-amber-900 hover:bg-amber-100 px-3 py-2 cursor-pointer rounded-md"
        >
          <Package className="mr-2 h-5 w-5" />
          Products
        </button>
        <button 
          onClick={() => navigate('/adminHome')} 
          className="flex items-center text-amber-900 hover:bg-amber-100 px-3 py-2 cursor-pointer rounded-md"
        >
          <Settings className="mr-2 h-5 w-5" />
          Settings
        </button>
        <button 
          onClick={handleLogout}
          className="bg-red-100 text-red-800 px-4 py-2 rounded-md hover:bg-red-200 transition cursor-pointer flex items-center mt-2 sm:mt-0"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
