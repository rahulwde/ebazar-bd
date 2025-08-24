import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState({}); // productId: [reviews]
  const navigate = useNavigate();

  useEffect(() => {
    // 1️⃣ Fetch products
    axios
      .get("https://ecommerce-backend-one-omega.vercel.app/products")
      .then(async (res) => {
        const latestProducts = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setProducts(latestProducts);

        // 2️⃣ Fetch all reviews in batch
        try {
          const reviewRes = await axios.get(
            "https://ecommerce-backend-one-omega.vercel.app/reviews"
          );
          const allReviews = reviewRes.data;

          // Map reviews by productId
          const reviewMap = {};
          latestProducts.forEach((product) => {
            reviewMap[product._id] = allReviews.filter(
              (r) => r.productId === product._id
            );
          });
          setReviews(reviewMap);
        } catch (err) {
          console.error("Error fetching reviews:", err);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  if (products.length === 0)
    return <p className="text-center mt-10">No products found.</p>;

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#00fff5]">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const productReviews = reviews[product._id] || [];
            const avgRating =
              productReviews.length > 0
                ? productReviews.reduce((sum, r) => sum + r.rating, 0) /
                  productReviews.length
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
                  src={product.image}
                  alt={product.itemName}
                  className="w-full h-48 object-cover mb-4 rounded-xl"
                />

                {/* Product Title */}
                <h2 className="text-lg font-semibold mb-2">{product.itemName}</h2>

                {/* Review Stars */}
                {productReviews.length > 0 && (
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 mr-1 ${
                          i < Math.round(avgRating)
                            ? "text-yellow-400"
                            : "text-gray-300"
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
                               shadow-md hover:shadow-xl transition duration-300 py-2"
                  >
                    See Details
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* See All Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            See All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;
