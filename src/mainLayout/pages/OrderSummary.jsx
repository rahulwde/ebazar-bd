import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/Authcontext";

export default function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  const { user } = useContext(AuthContext);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        <h2 className="text-xl font-semibold mb-4">No Order Found</h2>
        <button
          onClick={() => navigate("/cart")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go to Cart
        </button>
      </div>
    );
  }

  const defaultAdvance = order.totalPrice > 200 ? 100 : 60;

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    advancePayment: defaultAdvance,
    paymentProof: "",
    transactionId: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("image", file);

    try {
      const apiKey = "26f7c897fe17caa771f71e53acc91721"; // imgbb API key
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        form
      );
      setFormData((prev) => ({ ...prev, paymentProof: res.data.data.url }));
      Swal.fire("✅ Success", "Image uploaded successfully!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Failed to upload image", "error");
    }
  };

  const handleConfirmOrder = async () => {
    if (!formData.paymentProof && !formData.transactionId) return;

    try {
      const orderPayload = {
        ...order,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
        advancePayment: formData.advancePayment,
        paymentProof: formData.paymentProof,
        transactionId: formData.transactionId,
        status: "pending",
      };

      const res = await axios.post("http://localhost:5000/orders", orderPayload);

      if (res.status === 201) {
        Swal.fire(
          "✅ Order Confirmed",
          `Your order is placed. Advance payment: $${formData.advancePayment}`,
          "success"
        );
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Failed to confirm order", "error");
    }
  };

  const isSubmitDisabled = !formData.paymentProof && !formData.transactionId;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      {/* Order Items */}
      <ul className="space-y-3">
        {order.items.map((item, index) => (
          <li key={index} className="flex items-center justify-between border-b py-3">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{item.productName}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.price * item.quantity}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-right text-xl font-semibold">Total Price: ${order.totalPrice}</div>

      {/* User Details Form */}
      <div className="border p-4 rounded shadow space-y-4">
        <h3 className="text-lg font-semibold">Your Details</h3>
        <form className="space-y-3">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full px-3 py-2 border rounded" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 border rounded" />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full px-3 py-2 border rounded" />
          <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full px-3 py-2 border rounded" rows={3} />

          <div>
            <label className="block font-medium mb-1">Advance Payment</label>
            <input type="number" name="advancePayment" value={formData.advancePayment} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block font-medium mb-1">Transaction ID (Optional)</label>
            <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} placeholder="Enter transaction ID" className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block font-medium mb-1">Payment Proof (Image)</label>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            {formData.paymentProof && <img src={formData.paymentProof} alt="Payment Proof" className="w-32 mt-2 rounded" />}
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleConfirmOrder}
            disabled={isSubmitDisabled}
            className={`px-4 py-2 rounded text-white ${isSubmitDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
