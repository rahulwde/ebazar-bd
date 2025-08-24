import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/Authcontext";

const UpdateProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  // ✅ Load single product
  useEffect(() => {
    axios
      .get(`https://ecommerce-backend-one-omega.vercel.app/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // ✅ Update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    let imageUrl = product.image;

    // যদি নতুন image select করা হয় তাহলে ImgBB তে upload হবে
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      const imgbbAPIKey = "26f7c897fe17caa771f71e53acc91721";
      const imageData = new FormData();
      imageData.append("image", imageFile);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        imageData
      );
      imageUrl = imgbbRes.data.data.url;
    }

    const updatedData = Object.fromEntries(formData.entries());
    updatedData.image = imageUrl;
    updatedData.email = user?.email;
    updatedData.name = user?.displayName;

    try {
      const res = await axios.put(
        `https://ecommerce-backend-one-omega.vercel.app/products/${id}`,
        updatedData
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Product updated successfully",
          icon: "success",
        });
        navigate("/my-products"); // back to product list
      } else {
        Swal.fire({
          title: "No Changes",
          text: "No field was updated",
          icon: "info",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-600">
          Update Product
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Item Name */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Item Name</label>
            <input
              name="itemName"
              type="text"
              defaultValue={product.itemName}
              className="border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Item Image */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Item Image</label>
            <input name="image" type="file" className="border border-gray-300 p-2 rounded bg-white" />
            <img
              src={product.image}
              alt="current"
              className="w-20 mt-2 rounded border"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col sm:col-span-2">
            <label className="font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              defaultValue={product.description}
              className="border border-gray-300 p-2 rounded"
            ></textarea>
          </div>

          {/* Regular Price */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Regular Price</label>
            <input
              name="regularPrice"
              type="number"
              defaultValue={product.regularPrice}
              className="border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Sell Price */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Sell Price</label>
            <input
              name="sellPrice"
              type="number"
              defaultValue={product.sellPrice}
              className="border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Product Serial */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Product Serial</label>
            <input
              name="productSerial"
              type="text"
              defaultValue={product.productSerial}
              className="border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Product Code */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Product Code</label>
            <input
              name="productCode"
              type="text"
              defaultValue={product.productCode}
              className="border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Quantity</label>
            <input
              name="quantity"
              type="number"
              defaultValue={product.quantity}
              className="border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Warranty */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">Warranty</label>
            <input
              name="warranty"
              type="text"
              defaultValue={product.warranty}
              className="border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Shipping Info */}
          <div className="flex flex-col sm:col-span-2">
            <label className="font-medium text-gray-700 mb-1">Shipping Info</label>
            <input
              name="shippingInfo"
              type="text"
              defaultValue={product.shippingInfo}
              className="border border-gray-300 p-2 rounded"
            />
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 text-center mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
