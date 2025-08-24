import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "./Loader";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../Context/Authcontext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
const [rating, setRating] = useState(0);
const [hover, setHover] = useState(null);
const [comment, setComment] = useState("");

  const {user} = use(AuthContext)
  const navigate = useNavigate()
console.log(id)
  useEffect(() => {
    axios
      .get(`https://ecommerce-backend-one-omega.vercel.app/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log(res.data)
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);
function handleSubmitReview() {
  if (!rating || !comment) {
    Swal.fire("Oops!", "Please give a rating and write a comment.", "warning");
    return;
  }

  axios
    .post("https://ecommerce-backend-one-omega.vercel.app/reviews", {
      productId: id,
      rating,
      comment,
      userEmail: user.email,
    })
    .then((res) => {
      Swal.fire("Success!", "Your review has been added.", "success");
      setReviews((prev) => [...prev, res.data]); // UI তে নতুন review দেখাবে
      setRating(0);
      setComment("");
    })
    .catch((err) => {
      console.error(err);
      Swal.fire("Error", "Failed to add review.", "error");
    });
}

    function handleAddToCart(product) {
    
     const guestId = localStorage.getItem("guestId") || crypto.randomUUID();
    if (!localStorage.getItem("guestId"))
      localStorage.setItem("guestId", guestId);

    axios
      .post("https://ecommerce-backend-one-omega.vercel.app/cart", {
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
  {Array.isArray(product.images) && product.images.length > 0 ? (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={10}
      slidesPerView={1}
      className="w-full h-full rounded-xl"
    >
      {product.images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`${product.itemName}-${index}`}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <img
      src={product.image}
      alt={product.itemName}
      className="w-full h-full object-cover"
    />
  )}
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
                      ৳{product.regularPrice}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold pr-2 py-2">Sell Price:</td>
                  <td className="text-green-600 font-bold">
                    ৳{product.sellPrice}
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
          {/* ================= Review Section ================= */}
<div className="mt-10 bg-white p-6 rounded-xl shadow-md">
  <h3 className="text-xl font-bold mb-4 text-gray-800">Customer Reviews</h3>

  {/* Review Form */}
  {user ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitReview();
      }}
      className="mb-6"
    >
      {/* Star Rating */}
      <div className="flex gap-2 mb-4">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <FaStar
              key={ratingValue}
              size={28}
              className={`cursor-pointer transition ${
                ratingValue <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          );
        })}
      </div>

      {/* Comment Input */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#00fff5] mb-4"
        rows={3}
      />

      <button
        type="submit"
        className="w-full py-2 px-4 rounded-lg font-semibold 
                   bg-gradient-to-r from-[#f95f35] to-[#e7552f] 
                   hover:from-[#39ff14] hover:to-[#00fff5] 
                   text-white shadow-md hover:shadow-xl transition"
      >
        Submit Review
      </button>
    </form>
  ) : (
    <p className="text-gray-600">
      Please{" "}
      <span
        className="text-blue-600 cursor-pointer underline"
        onClick={() => navigate("/login")}
      >
        login
      </span>{" "}
      to write a review.
    </p>
  )}

  {/* Show Reviews */}
  <div className="space-y-4">
    {reviews.length === 0 ? (
      <p className="text-gray-500">No reviews yet. Be the first!</p>
    ) : (
      reviews.map((rev, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          {/* Stars */}
          <div className="flex mb-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                size={20}
                className={
                  index < rev.rating ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}
          </div>

          {/* Comment */}
          <p className="text-gray-700">{rev.comment}</p>

          {/* User Info */}
          <p className="text-sm text-gray-500 mt-2">
            — {rev.userEmail || "Anonymous"}
          </p>
        </div>
      ))
    )}
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
