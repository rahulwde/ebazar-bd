import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/Authcontext";
 
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
  const { user } = use(AuthContext)

  // ✅ Fetch cart items
  useEffect(() => {
    axios
      .get(`http://localhost:5000/cart/guest/${guestId}`)
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
      .put(`http://localhost:5000/cart/${id}`, { quantity })
      .then(() => {
        setCartItems((items) =>
          items.map((i) => (i._id === id ? { ...i, quantity } : i))
        );
      })
      .catch((err) =>
        console.error(`Error updating quantity for ${id}:`, err)
      );
  };

  // ✅ Remove item
  const removeItem = (id) => {
    axios
      .delete(`http://localhost:5000/cart/${id}`)
      .then(() => {
        setCartItems((items) => items.filter((i) => i._id !== id));
      })
      .catch((err) => console.error(`Error removing item ${id}:`, err));
  };

  // ✅ Handle single item order
const handleSingleOrder = (item) => {
  if (!user) return navigate("/login", { state: { from: { pathname: "/order-summary" } } });

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

  // ✅ Handle Order All
  const handleOrderNow = async () => {
    if (!user) return navigate("/login", { state: { from: { pathname: "/order-summary" } } });

    try {
      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.sellPrice * item.quantity,
        0
      );

      const orderData = {
        guestId,
        items: cartItems.map((item) => ({
          productId: item._id,
          productName: item.itemName,
          quantity: item.quantity,
          price: item.sellPrice,
          image: item.image,
        })),
        totalPrice,
        status: "pending",
        createdAt: new Date(),
      };

      const res = await axios.post("http://localhost:5000/orders", orderData);

      if (res.status === 201) {
        alert("✅ Order placed successfully!");
        navigate("/order-summary", { state: { order: res.data } });
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("❌ Failed to place order!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex items-center justify-between border-b py-3"
              >
                {/* ✅ Image and info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.itemName}</h3>
                    <p>Price: ${item.sellPrice}</p>
                    <p>Total: ${item.sellPrice * item.quantity}</p>
                  </div>
                </div>

                {/* ✅ Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    disabled={item.quantity <= 1}
                    className="bg-gray-200 px-2 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item._id)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>

                  <button
                    onClick={() => handleSingleOrder(item)}
                    className="ml-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Order
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* ✅ Order All button */}
          <div className="mt-6 text-right">
            <button
              onClick={handleOrderNow}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Order All
            </button>
          </div>
        </>
      )}
    </div>
  );
}
