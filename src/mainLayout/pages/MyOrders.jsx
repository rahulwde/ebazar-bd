import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/Authcontext";
import Loader from "./Loader";
import { FaSadTear } from "react-icons/fa";
import Swal from "sweetalert2";

export default function MyOrders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-backend-one-omega.vercel.app/orders?email=${user.email}`
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

  const handleCancelOrder = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      // Backend থেকে cancel/delete করা
      await axios.delete(
        `https://ecommerce-backend-one-omega.vercel.app/orders/${id}`
      );

      // frontend থেকে remove করা
      setOrders((prev) => prev.filter((order) => order._id !== id));

      Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
    } catch (err) {
      console.error("Error cancelling order:", err);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  if (!user) {
    return (
      <p className="text-center mt-10 text-[#0d0d0e]">
        Please login to view your orders.
      </p>
    );
  }

  if (loading) return <Loader />;

  if (orders.length === 0)
    return (
      <div className="flex flex-col items-center justify-center mt-10 text-center text-gray-700">
        <FaSadTear size={48} className="text-gray-400 mb-4" />
        <p className="text-lg font-semibold">আপনি এখনো কোনো order করেননি</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#0d0d0e]">
        My Orders
      </h2>

      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order._id}
            className="border rounded-lg shadow-lg p-4 bg-[#8b8bb5] text-[#0d0d0e] transition-transform duration-300 hover:scale-105"
          >
            {/* Top: Name + Status */}
            <div className="flex justify-between items-center mb-4 text-[#0d0d0e]">
              <h3 className="font-semibold text-lg">{order.customer?.name}</h3>
              <span
                className={`px-3 py-1 rounded font-medium ${
                  order.status === "pending"
                    ? "bg-yellow-500 text-[#0d0d0e]"
                    : order.status === "confirmed"
                    ? "bg-green-500 text-[#0d0d0e]"
                    : "bg-red-500 text-[#0d0d0e]"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Details Table */}
            <div className="overflow-x-auto mb-4">
              <table className="table-auto w-full text-sm border-collapse border text-[#0d0d0e]">
                <tbody>
                  <tr className="border-b p-2">
                    <td className="font-semibold py-2">Email</td>
                    <td className="pr-2">{order.customer?.email}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="font-semibold pr-2 py-2">Phone</td>
                    <td className="py-2">{order.customer?.phone}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="font-semibold pr-2 py-2">Address</td>
                    <td className="py-2">{order.customer?.address}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="font-semibold pr-2 py-2">Items</td>
                    <td className="py-2">
                      <ul className="pl-4 list-disc">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>
                              {item.productName} x {item.quantity}
                            </span>
                            <span className="font-bold p-2">
                              ৳{item.price * item.quantity}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-2 py-2">Total Price</td>
                    <td className="py-2 font-bold">৳{order.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Proof */}
            {order.paymentProof && (
              <div className="flex items-center gap-4 mb-4">
                <span className="font-semibold text-[#0d0d0e]">
                  Payment Proof:
                </span>
                <img
                  src={order.paymentProof}
                  alt="Payment Proof"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            )}

            {/* Cancel Button */}
            {order.status === "pending" && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Cancel Order
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
