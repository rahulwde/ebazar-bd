import React, { useContext, useState } from 'react';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Login Leady.json';
import { Link, useLocation, useNavigate } from 'react-router';
 import { FcGoogle } from "react-icons/fc"; // Google Icon
import { AuthContext } from '../Context/Authcontext';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = () => {
  const { signIn, googleSignIn,setUser } = useContext(AuthContext); // googleSignIn add করতে হবে context এ
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // PrivateRoute থেকে আগের page path
  const from = location.state?.from?.pathname || '/';

  // Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password); // Auth logic
      navigate(from, { replace: true }); // login successful → আগের page এ redirect
    } catch (err) {
      console.error('Login failed:', err);
      alert('❌ Login failed!');
    }
  };
    const saveUserToDB = async (user) => {
      const newUser = {
        name: user.displayName || "No Name",
        email: user.email,
        role: "user", // default role
      };
      try {
        await axios.post("https://ecommerce-backend-one-omega.vercel.app/users", newUser);
      } catch (error) {
        console.error("Error saving user:", error.message);
      }
    };

  // Google Login
   const handleGoogleLogin = async () => {
     try {
       const result = await googleSignIn();
       setUser(result.user);
 
       // ✅ DB তে পাঠানো
       await saveUserToDB(result.user);
 
       Swal.fire({
         icon: "success",
         title: "Login Successful!",
         text: `Welcome, ${result.user.displayName || "User"}!`,
         timer: 2000,
         showConfirmButton: false,
       });
       navigate("/");
     } catch (error) {
       Swal.fire({
         icon: "error",
         title: "Google Login Failed",
         text: error.message,
       });
     }
   };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Lottie Animation Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <Lottie
          animationData={loginAnimation}
          loop
          className="w-full h-72 sm:h-96 md:h-full md:max-w-xl"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6 sm:p-10">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <span className="w-1/5 border-b border-gray-300"></span>
            <span className="mx-2 text-gray-500 text-sm">OR</span>
            <span className="w-1/5 border-b border-gray-300"></span>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-200 transition duration-200"
          >
            <FcGoogle size={22} /> 
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?
            <Link to="/signup">
              <span className="text-blue-600 ml-1 font-medium cursor-pointer hover:underline">
                Sign Up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
