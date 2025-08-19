import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/Authcontext";
 
export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        // ✅ Backend should return orders for this user (by email)
        const res = await axios.get(
          `http://localhost:5000/orders?email=${user.email}`
        );
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <p className="text-center mt-10">Please login to view your orders.</p>;
  }

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order._id} className="border p-4 rounded shadow space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{order.customer?.name}</h3>
              <span
                className={`px-2 py-1 rounded text-white ${
                  order.status === "pending"
                    ? "bg-yellow-500"
                    : order.status === "confirmed"
                    ? "bg-green-500"
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
                    {item.productName} x {item.quantity} - ${item.price * item.quantity}
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
          </li>
        ))}
      </ul>
    </div>
  );
}
