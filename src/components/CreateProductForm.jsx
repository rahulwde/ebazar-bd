import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import axios from "axios";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const { user } = useContext(AuthContext);
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Get image files
    const imageFiles = formData.getAll("image"); // array of files
    if (imageFiles.length === 0) {
      Swal.fire({ title: "Please select at least one image", icon: "warning" });
      return;
    }

    const imgbbAPIKey = "26f7c897fe17caa771f71e53acc91721";
    let uploadedImages = [];

    try {
      for (let file of imageFiles) {
        const imageData = new FormData();
        imageData.append("image", file);

        const imgbbRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
          imageData
        );
        uploadedImages.push(imgbbRes.data.data.url);
      }

      // Prepare product data
      const productData = Object.fromEntries(formData.entries());
      productData.images = uploadedImages;
      productData.email = user?.email || "";
      productData.regularPrice = Number(productData.regularPrice || 0);
      productData.sellPrice = Number(productData.sellPrice || 0);
      productData.quantity = Number(productData.quantity || 0);

      const res = await axios.post(
        "https://ecommerce-backend-one-omega.vercel.app/products",
        productData
      );

      if (res.data.insertedId) {
        Swal.fire({ title: "Product created successfully", icon: "success" });
        form.reset();
        setPreviewImages([]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ title: "Error", text: "Failed to create product", icon: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Create New Product
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Item Name */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Item Name</label>
            <input
              name="itemName"
              type="text"
              required
              placeholder="Enter product name"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Item Image */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Item Image</label>
            <input
              name="image"
              type="file"
              multiple
              required
              onChange={handleImageChange}
              className="border border-gray-300 p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {previewImages.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {previewImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Preview ${i}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col sm:col-span-2">
            <label className="font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Enter product description"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Regular Price */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Regular Price</label>
            <input
              name="regularPrice"
              type="number"
              placeholder="৳ Regular Price"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sell Price */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Sell Price</label>
            <input
              name="sellPrice"
              type="number"
              required
              placeholder="৳ Sell Price"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Serial */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Product Serial</label>
            <input
              name="productSerial"
              type="text"
              placeholder="Serial Number"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Product Code */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Product Code</label>
            <input
              name="productCode"
              type="text"
              placeholder="Code (e.g., P1234)"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Quantity</label>
            <input
              name="quantity"
              type="number"
              placeholder="Available stock"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Warranty */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Warranty</label>
            <input
              name="warranty"
              type="text"
              placeholder="e.g., 1 year"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Shipping Info */}
          <div className="flex flex-col sm:col-span-2">
            <label className="font-medium text-gray-700 mb-1">Shipping Info</label>
            <input
              name="shippingInfo"
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
