import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/orders")
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch orders");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id} className="border rounded p-4 mb-4">
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Email:</strong> {order.email || "-"}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p><strong>Payment Info Type:</strong> {order.paymentInfoType}</p>
            {order.paymentInfoType === "transactionId" && (
              <p><strong>Transaction ID:</strong> {order.transactionId}</p>
            )}
            {order.paymentInfoType === "paymentScreenshot" && (
              <img
                src={order.paymentScreenshot}
                alt="Payment Screenshot"
                className="w-48 border mt-2"
              />
            )}
            <p><strong>Total Price:</strong> {order.totalPrice} ৳</p>

            <details className="mt-2">
              <summary className="cursor-pointer font-semibold">Ordered Items</summary>
              <ul className="mt-1 list-disc list-inside">
                {order.cartItems.map(item => (
                  <li key={item._id}>
                    {item.itemName} - {item.quantity} × ৳{item.sellPrice} = ৳{item.sellPrice * item.quantity}
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
