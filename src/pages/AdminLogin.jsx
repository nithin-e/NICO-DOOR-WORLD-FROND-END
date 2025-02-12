import React, { useEffect, useState } from 'react';
import { LogIn, User, Lock } from 'lucide-react';
import axiosInstance from "../cors/axiousInstence";
import { useNavigate } from 'react-router-dom';
import validateCredentials from '../util/validation'


const AdminLogin = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [globalErr, setGlobalErr] = useState('')

  const [formData,setFormData]=useState({
    email:'',
    password:''
  })


  const handleInputChange=(e)=>{
      try {
        const {name,value}=e.target
        let newData={...formData}
        newData[name]=value
        setFormData(newData)
      } catch (error) {
        console.log('hellowwww');
        
        console.log(error);
      }
  }


  const  handleLogin =async (e) => {
    e.preventDefault();
    try{
        
        const {isValid, errors} = validateCredentials(formData)
         if (isValid) {
          const response = await axiosInstance.post(
            "http://localhost:4000/api/adminLogin",
            formData,
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          
            console.log('Login successful:', response.data)

           navigate('/adminHome')
         }else{
            setErrors(errors)
         }
       
      
          
        
    } catch (error) {
        console.log('backil onnum etheetilla',error.response.data.message)
        setGlobalErr(error.response.data.message)
        console.log(error);
        
    }
    

  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <svg 
              viewBox="0 0 50 50" 
              className="w-16 h-16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M15 8 L35 4 L35 46 L15 42 Z" 
                className="fill-amber-800"
                stroke="#2d1810"
                strokeWidth="1"
              />
              <path 
                d="M18 12 L32 9 L32 39 L18 36 Z" 
                className="fill-amber-600"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-amber-900">Admin Login</h2>
          <p className="text-gray-600 mt-2">Nice Door World Management Portal</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
          {errors.email &&(<p className="text-red-500 text-xs">{errors.email }</p>) }
          {globalErr &&(<p className="text-red-500 text-xs">{globalErr }</p>) }
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-amber-800" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          
          <div className="relative">
          {errors.password &&(<p className="text-red-500 text-xs">{errors.password }</p>) }

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-amber-800" />
            </div>
            <input
              type="password"
              placeholder="Password"
              name='password'
              value={formData.password}
              onChange={handleInputChange}
             
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
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