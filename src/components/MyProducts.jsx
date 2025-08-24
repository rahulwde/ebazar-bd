import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Authcontext";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ✅ Get logged-in user's products
  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://ecommerce-backend-one-omega.vercel.app/products`
        )
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  // ✅ Delete product
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://ecommerce-backend-one-omega.vercel.app/products/${id}`
          );
          setProducts(products.filter((item) => item._id !== id));
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to delete product", "error");
        }
      }
    });
  };

  // ✅ Edit product
  const handleEdit = (id) => {
    navigate(`/update-product/${id}`); 
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        My Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.itemName}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold">{product.itemName}</h3>
               <p className="mt-2 text-blue-600 font-bold">
                ৳{product.sellPrice}{" "}
                <span className="line-through text-gray-400 ml-2">
                  ৳{product.regularPrice}
                </span>
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(product._id)}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
