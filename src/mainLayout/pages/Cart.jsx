import React, { useEffect, useState } from "react";
import axios from "axios";

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
  console.log(guestId)

  useEffect(() => {
    axios.get(`http://localhost:5000/cart/${guestId}`)
      .then(res => setCartItems(res.data))
      .catch(console.error);
  }, [guestId]);
 console.log(cartItems)
  const increaseQty = (id) => {
    const item = cartItems.find(i => i._id === id);
    if (!item) return;
    const newQty = Number(item.quantity) + 1;
    updateQuantity(id, newQty);
  };

  const decreaseQty = (id) => {
    const item = cartItems.find(i => i._id === id);
    if (!item || item.quantity <= 1) return;
    const newQty = Number(item.quantity) - 1;
    updateQuantity(id, newQty);
  };

  const updateQuantity = (id, quantity) => {
    axios.put(`http://localhost:5000/cart/${id}`, { quantity })
      .then(() => {
        setCartItems(items =>
          items.map(i => i._id === id ? { ...i, quantity } : i)
        );
      })
      .catch(console.error);
  };

  const removeItem = (id) => {
     axios.delete(`http://localhost:5000/cart/${id}`)
      .then(() => {
        setCartItems(items => items.filter(i => i._id !== id));
      })
      .catch(console.error);
  };
  console.log(cartItems)

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item._id} className="flex items-center justify-between border-b py-3">
              <div>
                <h3 className="font-semibold">{item.itemName}</h3>
                <p>Price: ${item.sellPrice}</p>
                <p>Total: ${item.sellPrice * item.quantity}</p>
              </div>
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
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
