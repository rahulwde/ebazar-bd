import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loader from "./Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return  <Loader></Loader>
  if (products.length === 0)
    return <p className="text-center mt-10">No products found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#00fff5]">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-2xl p-4 flex flex-col 
                       bg-gradient-to-br from-[#00fff5] to-[#39ff14] 
                       text-gray-900 shadow-md 
                       transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.itemName}
              className="w-full h-48 object-cover mb-4 rounded-xl"
            />

            {/* Product Title */}
            <h2 className="text-lg font-semibold mb-2">{product.itemName}</h2>

            {/* Prices + Stock in one line */}
            <div className="flex items-center justify-between mb-3">
              <div>
                {product.regularPrice &&
                product.sellPrice &&
                Number(product.sellPrice) < Number(product.regularPrice) ? (
                  <span className="line-through text-gray-700 mr-2">
                    ৳{product.regularPrice}
                  </span>
                ) : (
                  <span className="text-gray-800 mr-2">
                    ৳{product.regularPrice}
                  </span>
                )}

                <span className="text-red-700 font-bold">
                  ৳{product.sellPrice}
                </span>
              </div>

              {product.quantity && (
                <p className="text-sm font-medium text-gray-800">
                  Stock: {product.quantity}
                </p>
              )}
            </div>

            {/* Optional: Description */}
            {product.description && (
              <p className="text-sm text-gray-800 line-clamp-3 mb-3">
                {product.description}
              </p>
            )}

            {/* Button */}
            <Link to={`/products/${product._id}`} className="mt-auto">
              <button
                className="btn btn-sm md:btn-md w-full 
                           bg-gradient-to-r from-[#f95f35] to-[#e7552f] 
                           hover:from-[#39ff14] hover:to-[#00fff5] 
                           text-white font-semibold rounded-lg border-none 
                           shadow-md hover:shadow-xl transition duration-300"
              >
                See Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
