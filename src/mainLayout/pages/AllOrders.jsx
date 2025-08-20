import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders/all");
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching all orders:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.put(`http://localhost:5000/orders/${orderId}`, {
        status,
      });

      if (res.status === 200) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status } : o))
        );
        alert(`✅ Order ${status} successfully!`);
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("❌ Failed to update order status");
    }
  };

  if (loading) return  <Loader></Loader>

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order._id} className="border p-4 rounded shadow space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{order.customer?.name}</h3>
              <span
                className={`px-2 py-1 rounded text-white ${
                  order.status === "pending"
                    ? "bg-yellow-500"
                    : order.status === "approved"
                    ? "bg-green-500"
                    : order.status === "rejected"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              >
                {order.status}
              </span>
            </div>

            <p>Email: {order.customer?.email}</p>
            <p>Phone: {order.customer?.phone}</p>
            <p>Address: {order.customer?.address}</p>

            <div>
              <h4 className="font-semibold">Items:</h4>
              <ul className="pl-4 list-disc">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.productName} x {item.quantity} - $
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-semibold">Total Price: ${order.totalPrice}</p>

            {order.paymentProof && (
              <div>
                <h4 className="font-semibold">Payment Proof:</h4>
                <img
                  src={order.paymentProof}
                  alt="Payment Proof"
                  className="w-32 h-32 object-cover rounded mt-1"
                />
              </div>
            )}

            <div className="flex space-x-2 mt-2">
              {order.status === "pending" && (
                <>
                  <button
                    onClick={() => updateStatus(order._id, "approved")}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(order._id, "rejected")}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
