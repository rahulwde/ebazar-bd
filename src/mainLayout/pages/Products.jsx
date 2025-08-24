import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Loader from "./Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Reviews state
  const [reviews, setReviews] = useState({}); // productId -> array of reviews

  useEffect(() => {
    axios
      .get("https://ecommerce-backend-one-omega.vercel.app/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);

        // প্রতিটি product এর review fetch করা হচ্ছে
        res.data.forEach((product) => {
          axios
            .get(
              `https://ecommerce-backend-one-omega.vercel.app/reviews/${product._id}`
            )
            .then((res) => {
              setReviews((prev) => ({ ...prev, [product._id]: res.data }));
            })
            .catch((err) => console.error(err));
        });
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  // Filter products on search
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset page on search
  }, [searchTerm, products]);

  if (loading) return <Loader />;
  if (products.length === 0)
    return <p className="text-center mt-10">No products found.</p>;

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#00fff5]">
        Our Products
      </h1>

      {/* Search Input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 p-2 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.length === 0 ? (
          <p className="text-center col-span-full mt-10 text-gray-600">
            No matching products found.
          </p>
        ) : (
          currentProducts.map((product) => {
            // Average Rating
            const productReviews = reviews[product._id] || [];
            const avgRating =
              productReviews.length > 0
                ? (
                    productReviews.reduce((sum, r) => sum + r.rating, 0) /
                    productReviews.length
                  ).toFixed(1)
                : 0;

            return (
              <div
                key={product._id}
                className="rounded-2xl p-4 flex flex-col 
                           bg-gradient-to-br from-[#00fff5] to-[#39ff14] 
                           text-gray-900 shadow-md 
                           transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Product Image */}
               <img
  src={Array.isArray(product.images) ? product.images[0] : product.image}
  alt={product.itemName}
  className="w-full h-48 object-cover mb-4 rounded-xl"
/>

                {/* Title */}
                <h2 className="text-lg font-semibold mb-1">{product.itemName}</h2>

                {/* Rating */}
                {/* Rating */}
{productReviews.length > 0 && (
  <div className="flex items-center mb-2">
    {Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 mr-1 ${
          i < Math.round(avgRating) ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.954a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.922-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.196-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.068 9.38c-.783-.57-.38-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.286-3.954z" />
      </svg>
    ))}
    <span className="text-sm text-gray-800 ml-2">
      ({productReviews.length})
    </span>
  </div>
)}


                {/* Prices + Stock */}
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

                {/* Description */}
                {product.description && (
                  <p className="text-sm text-gray-800 line-clamp-3 mb-3">
                    {product.description}
                  </p>
                )}

                {/* See Details Button */}
                <Link to={`/products/${product._id}`} className="mt-auto">
                  <button
                    className="btn btn-sm md:btn-md w-full 
                               bg-gradient-to-r from-[#f95f35] to-[#e7552f] 
                               hover:from-[#39ff14] hover:to-[#00fff5] 
                               text-white font-semibold rounded-lg border-none 
                               shadow-md hover:shadow-xl transition duration-300 py-3"
                  >
                    See Details
                  </button>
                </Link>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg text-white font-medium disabled:opacity-50 
                       bg-gradient-to-r from-[#f95f35] to-[#e7552f] 
                       hover:from-[#39ff14] hover:to-[#00fff5]"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                currentPage === i + 1
                  ? "text-white bg-gradient-to-r from-[#39ff14] to-[#00fff5]"
                  : "text-gray-800 bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg text-white font-medium disabled:opacity-50 
                       bg-gradient-to-r from-[#f95f35] to-[#e7552f] 
                       hover:from-[#39ff14] hover:to-[#00fff5]"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
