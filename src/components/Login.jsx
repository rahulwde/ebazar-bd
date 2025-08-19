import React, {  use, useState } from 'react';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Login Leady.json';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Context/Authcontext';
 
const Login = () => {
  const { signIn } =use(AuthContext); // Firebase login বা custom login function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // PrivateRoute থেকে আগের page path
  const from = location.state?.from?.pathname || '/';

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
