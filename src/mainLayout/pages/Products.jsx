import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../Context/CartContext";
import Swal from "sweetalert2";
 
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
 
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

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  if (products.length === 0)
    return <p className="text-center mt-10">No products found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.itemName}
              className="w-full h-48 object-cover mb-4 rounded"
            />

            {/* Product Title */}
            <h2 className="text-lg font-semibold mb-2">{product.itemName}</h2>

            {/* Prices */}
            <div className="mb-2">
              {/* Regular Price (crossed out if sell price is lower) */}
              {product.regularPrice && product.sellPrice && Number(product.sellPrice) < Number(product.regularPrice) ? (
                <span className="line-through text-gray-500 mr-2">
                  ৳{product.regularPrice}
                </span>
              ) : (
                <span className="text-gray-700 mr-2">৳{product.regularPrice}</span>
              )}

              {/* Sell Price */}
              <span className="text-red-600 font-bold">
                ৳{product.sellPrice}
              </span>
            </div>

            {/* Optional: Quantity */}
            {product.quantity && (
              <p className="text-sm text-gray-600 mb-2">
                Stock: {product.quantity}
              </p>
            )}

            {/* Optional: Description */}
            {product.description && (
              <p className="text-sm text-gray-700 line-clamp-3">
                {product.description}
              </p>
            )}

            {/* Add to Cart or Buy Button (optional) */}
           <button
  onClick={() => {
    addToCart(product);
    console.log(product)
     Swal.fire({
      title: "Added to Cart",
      text: `${product.itemName} কার্টে যোগ করা হয়েছে!`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  }}
  className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
>
  Add to Cart
</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
