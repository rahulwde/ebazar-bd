import React from 'react';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Login Leady.json';
import { Link } from 'react-router';

const Login = () => {
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
          <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?
           <Link to="/signup"> <span className="text-blue-600 ml-1 font-medium cursor-pointer hover:underline">
              Sign Up
            </span></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
