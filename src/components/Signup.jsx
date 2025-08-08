import React, { use } from "react";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import signupAnimation from "../assets/Login Leady.json";
import { AuthContext } from "../Context/Authcontext";
import { useNavigate } from "react-router";
 
const Signup = () => {
  const { createUser, setUser, googleSignIn } = use(AuthContext);
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
 
    try {
      const result = await createUser(email, password);
      setUser({
        ...result.user,
        displayName: name,
       });

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been created successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      form.reset();
     navigate("/")
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      setUser(result.user);

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome, ${result.user.displayName || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/")
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
      {/* Animation */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <Lottie
          animationData={signupAnimation}
          loop
          className="w-full h-72 sm:h-96 md:h-full md:max-w-xl"
        />
      </div>

      {/* Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6 sm:p-10">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>
 

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Sign Up
            </button>
          </form>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
          >
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?
            <span className="text-blue-600 ml-1 font-medium cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
