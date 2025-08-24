import React, { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router";
import axios from "axios";

const FloatingCartIcon = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const guestId = localStorage.getItem("guestId");
    if (guestId) {
      axios
        .get(`https://ecommerce-backend-one-omega.vercel.app/cart/guest/${guestId}`)
        .then((res) => {
          const total = res.data.reduce((acc, item) => acc + item.quantity, 0);
          setCartCount(total);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  // Optionally, update cart count when a new item is added
  useEffect(() => {
    const interval = setInterval(() => {
      const guestId = localStorage.getItem("guestId");
      if (guestId) {
        axios
          .get(`https://ecommerce-backend-one-omega.vercel.app/cart/guest/${guestId}`)
          .then((res) => {
            const total = res.data.reduce((acc, item) => acc + item.quantity, 0);
            setCartCount(total);
          });
      }
    }, 3000); // check every 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      to="/cart"
      className="fixed right-10 top-1/2 transform -translate-y-1/2 z-50"
    >
      <div className="relative group">
        {/* Cart Icon with animation */}
        <BsCart4
          size={28}
          className="text-gray-700 hover:text-blue-600 transition-transform duration-300 group-hover:scale-125 animate-bounce-slow cursor-pointer"
        />

        {/* Badge for cart count */}
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">
            {cartCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default FloatingCartIcon;
