import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/Authcontext";
import Swal from "sweetalert2";

// ✅ Generate or retrieve guestId
function getGuestId() {
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = crypto.randomUUID();
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const guestId = getGuestId();
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  // ✅ Fetch cart items
  useEffect(() => {
    axios
      .get(`https://ecommerce-backend-fdas.vercel.app/cart/guest/${guestId}`)
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("Error fetching cart:", err));
  }, [guestId]);

  // ✅ Increase quantity
  const increaseQty = (id) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item) return;
    updateQuantity(id, item.quantity + 1);
  };

  // ✅ Decrease quantity
  const decreaseQty = (id) => {
    const item = cartItems.find((i) => i._id === id);
    if (!item || item.quantity <= 1) return;
    updateQuantity(id, item.quantity - 1);
  };

  // ✅ Update quantity in backend
  const updateQuantity = (id, quantity) => {
    axios
      .put(`https://ecommerce-backend-fdas.vercel.app/cart/${id}`, { quantity })
      .then(() => {
        setCartItems((items) =>
          items.map((i) => (i._id === id ? { ...i, quantity } : i))
        );
      })
      .catch((err) => console.error(`Error updating quantity for ${id}:`, err));
  };

  // ✅ Remove item with SweetAlert2 confirmation
  const removeItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#39ff14",
      cancelButtonColor: "#f95f35",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://ecommerce-backend-fdas.vercel.app/cart/${id}`)
          .then(() => {
            setCartItems((items) => items.filter((i) => i._id !== id));
            Swal.fire("Removed!", "Item has been removed.", "success");
          })
          .catch((err) => console.error(err));
      }
    });
  };

  // ✅ Handle single item order
  const handleSingleOrder = (item) => {
    if (!user)
      return navigate("/login", {
        state: { from: { pathname: "/order-summary" } },
      });

    const orderData = {
      guestId,
      items: [
        {
          productId: item._id,
          productName: item.itemName,
          quantity: item.quantity,
          price: item.sellPrice,
          image: item.image,
        },
      ],
      totalPrice: item.sellPrice * item.quantity,
      status: "pending",
      createdAt: new Date(),
    };

    navigate("/order-summary", { state: { order: orderData } });
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border p-3 rounded-lg shadow-sm transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              {/* ✅ Image and info */}
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.itemName}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">
                    {item.itemName}
                  </h3>
                  <p className="text-sm font-bold text-gray-900">
                    Price: ৳{item.sellPrice}
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    Total: ৳{item.sellPrice * item.quantity}
                  </p>
                </div>
              </div>

              {/* ✅ Controls */}
              <div className="flex items-center mt-3 sm:mt-0 space-x-2">
                <button
                  onClick={() => decreaseQty(item._id)}
                  disabled={item.quantity <= 1}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item._id)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  +
                </button>

                {/* Remove button with gradient */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="ml-2 px-3 py-1 rounded text-white font-semibold bg-gradient-to-r from-[#f95f35] to-[#e7552f] hover:from-[#e7552f] hover:to-[#f95f35] transition duration-300 text-sm"
                >
                  Remove
                </button>

                {/* Order button with gradient */}
                <button
                  onClick={() => handleSingleOrder(item)}
                  className="ml-2 px-3 py-1 rounded text-white font-semibold bg-gradient-to-r from-[#00fff5] to-[#39ff14] hover:from-[#39ff14] hover:to-[#00fff5] transition duration-300 text-sm"
                >
                  Order
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
