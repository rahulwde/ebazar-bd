import React from 'react';

const CreateProduct = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Create New Product</h2>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Item Name */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Item Image */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Item Image</label>
            <input
              type="file"
              className="border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col sm:col-span-2">
            <label className="font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows="3"
              placeholder="Enter product description"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Regular Price */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Regular Price</label>
            <input
              type="number"
              placeholder="৳ Regular Price"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sell Price */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Sell Price</label>
            <input
              type="number"
              placeholder="৳ Sell Price"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Serial */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Product Serial</label>
            <input
              type="text"
              placeholder="Serial Number"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Code */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Product Code</label>
            <input
              type="text"
              placeholder="Code (e.g., P1234)"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              placeholder="Available stock"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Warranty */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Warranty</label>
            <input
              type="text"
              placeholder="e.g., 1 year"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Shipping Info */}
          <div className="flex flex-col sm:col-span-2">
            <label className="font-medium text-gray-700 mb-1">Shipping Info</label>
            <input
              type="text"
              placeholder="e.g., Free inside Dhaka, 70৳ outside"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 text-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
