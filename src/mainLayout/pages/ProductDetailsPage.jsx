import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

export default function ProductDetailsPage() {
  const { id } = useParams(); // URL থেকে id নেবে
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

 function handleAddToCart(product) {
  const guestId = localStorage.getItem("guestId") || crypto.randomUUID();
  if (!localStorage.getItem("guestId")) localStorage.setItem("guestId", guestId);
   axios.post("http://localhost:5000/cart", {
    guestId,
    productId: product._id,
    itemName: product.itemName,
    sellPrice: product.sellPrice,
    quantity: 1,
  })
  .then(() => alert("Added to cart"))
  .catch(console.error);
}

  if (loading) {
    return <p className="text-center mt-8">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center mt-8 text-red-500">Product not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/2">
          <img src={product.image} alt={product.itemName} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.itemName}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>

            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Product Code:</span> {product.productCode}</p>
              <p><span className="font-semibold">Serial:</span> {product.productSerial}</p>
              <p><span className="font-semibold">Available Quantity:</span> {product.quantity}</p>
              <p><span className="font-semibold">Regular Price:</span> 
                <span className="line-through text-red-500 ml-1">${product.regularPrice}</span>
              </p>
              <p><span className="font-semibold">Sell Price:</span> 
                <span className="text-green-600 font-bold ml-1">${product.sellPrice}</span>
              </p>
              <p><span className="font-semibold">Shipping Info:</span> {product.shippingInfo}</p>
              <p><span className="font-semibold">Warranty:</span> {product.warranty} days</p>
            </div>
          </div>

          {/* Seller */}
          <div className="mt-6 border-t pt-4 text-sm text-gray-500">
            <p><span className="font-semibold">Seller:</span> {product.name}</p>
            <p><span className="font-semibold">Email:</span> {product.email}</p>
          </div>

          {/* Add to Cart */}
          <button
  onClick={() => handleAddToCart(product)}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            Add to Cart
          </button>
          
        </div>
      </div>
    </div>
  );
}
