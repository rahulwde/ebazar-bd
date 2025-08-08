import React, { useState } from 'react';
import Lottie from 'lottie-react';
import axios from 'axios';
import signupAnimation from '../assets/Login Leady.json';

const Signup = () => {
  const [imagePreview, setImagePreview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('image', imageFile);

    setUploading(true);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=26f7c897fe17caa771f71e53acc91721`,
        formData
      );
      const url = res.data.data.display_url;
      setImageUrl(url);
      setImagePreview(url);
    } catch (error) {
      console.error('Image upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log({
      name,
      email,
      password,
      imageUrl,
    });

    // Later you'll send this to Firebase after validation
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
          <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full bg-white px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
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
