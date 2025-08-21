import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "./Loader";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://ecommerce-backend-fdas.vercel.app/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  function handleAddToCart(product) {
    const guestId = localStorage.getItem("guestId") || crypto.randomUUID();
    if (!localStorage.getItem("guestId"))
      localStorage.setItem("guestId", guestId);

    axios
      .post("https://ecommerce-backend-fdas.vercel.app/cart", {
        guestId,
        productId: product._id,
        itemName: product.itemName,
        sellPrice: product.sellPrice,
        image: product.image,
        quantity: 1,
      })
      .then(() => {
        Swal.fire({
          title: "Added to Cart!",
          text: `${product.itemName} has been added to your cart.`,
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while adding to cart.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "Close",
        });
      });
  }

  if (loading) {
    return <Loader></Loader>;
  }

  if (!product) {
    return <p className="text-center mt-8 text-red-500">Product not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 rounded-2xl overflow-hidden shadow-2xl">
      {/* Image Full Width */}
      <div className="w-full h-72 md:h-[450px]">
        <img
          src={product.image}
          alt={product.itemName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="bg-gradient-to-br from-[#00fff5] to-[#39ff14] p-6 md:p-8">
        <div className="bg-white rounded-xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            {product.itemName}
          </h2>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Table for Details */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="font-semibold pr-2 py-2">Product Code:</td>
                  <td>{product.productCode}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold pr-2 py-2">Serial:</td>
                  <td>{product.productSerial}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold pr-2 py-2">
                    Available Quantity:
                  </td>
                  <td>{product.quantity}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold pr-2 py-2">Regular Price:</td>
                  <td>
                    <span className="line-through text-red-500">
                      ${product.regularPrice}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold pr-2 py-2">Sell Price:</td>
                  <td className="text-green-600 font-bold">
                    ${product.sellPrice}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold pr-2 py-2">Warranty:</td>
                  <td>{product.warranty} days</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Seller Info */}
          <div className="mt-6 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Seller:</span> {product.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {product.email}
            </p>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-6 w-full py-3 px-4 
                       bg-[#00fff5] hover:bg-[#39ff14] 
                       text-gray-900 font-bold rounded-lg 
                       shadow-md hover:shadow-xl transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
