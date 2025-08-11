import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalPrice, cartItems } = location.state || {};

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    paymentInfoType: "transactionId", // default option
    transactionId: "",
    paymentScreenshot: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentInfoTypeChange = (e) => {
    setForm((prev) => ({
      ...prev,
      paymentInfoType: e.target.value,
      // reset other payment fields when switching type
      transactionId: "",
      paymentScreenshot: "",
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = "26f7c897fe17caa771f71e53acc91721";

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );

      setForm((prev) => ({
        ...prev,
        paymentScreenshot: res.data.data.url,
      }));

      Swal.fire({
        icon: "success",
        title: "Image Uploaded!",
        text: "Bkash Screenshot uploaded successfully.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Could not upload image. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // যাচাই: payment info টাইপ অনুযায়ী কমপ্লিট কিনা
    if (form.paymentInfoType === "transactionId" && !form.transactionId.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Transaction ID Required",
        text: "Please provide Bkash Transaction ID before confirming.",
      });
    }

    if (
      form.paymentInfoType === "paymentScreenshot" &&
      !form.paymentScreenshot.trim()
    ) {
      return Swal.fire({
        icon: "warning",
        title: "Payment Screenshot Required",
        text: "Please upload Bkash Payment Screenshot before confirming.",
      });
    }

    try {
      await axios.post("http://localhost:5000/orders", {
        ...form,
        totalPrice,
        cartItems,
        paymentMethod: "Cash on Delivery",
      });

      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been placed successfully.",
      }).then(() => navigate("/"));
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: "Something went wrong! Please try again.",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>
      <p className="mb-4">
        Total Price: <strong>{totalPrice} ৳</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User info */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        {/* Fixed Payment Method */}
        <div className="bg-gray-100 p-3 rounded">
          <p>
            <strong>Payment Method:</strong> Cash on Delivery (Fixed)
          </p>
        </div>

        {/* Fixed Bkash Number */}
        <div className="bg-yellow-50 border border-yellow-300 p-3 rounded mt-3">
          <p className="mb-2">
            Please send <strong>100৳</strong> advance payment to Bkash number:{" "}
            <strong>01712345678</strong>
          </p>

          {/* Payment Info Type selector */}
          <div className="mb-3">
            <label className="mr-4">
              <input
                type="radio"
                name="paymentInfoType"
                value="transactionId"
                checked={form.paymentInfoType === "transactionId"}
                onChange={handlePaymentInfoTypeChange}
                className="mr-1"
              />
              Transaction ID
            </label>
            <label>
              <input
                type="radio"
                name="paymentInfoType"
                value="paymentScreenshot"
                checked={form.paymentInfoType === "paymentScreenshot"}
                onChange={handlePaymentInfoTypeChange}
                className="mr-1"
              />
              Upload Screenshot
            </label>
          </div>

          {/* Conditionally render input based on paymentInfoType */}
          {form.paymentInfoType === "transactionId" && (
            <input
              type="text"
              name="transactionId"
              placeholder="Bkash Transaction ID"
              value={form.transactionId}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          )}

          {form.paymentInfoType === "paymentScreenshot" && (
            <>
              <input
                type="file"
                onChange={handleImageUpload}
                className="border p-2 w-full"
                accept="image/*"
                required
              />
              {uploading && (
                <p className="text-sm text-gray-500">Uploading screenshot...</p>
              )}
              {form.paymentScreenshot && (
                <img
                  src={form.paymentScreenshot}
                  alt="Bkash Screenshot"
                  className="mt-2 w-32 border"
                />
              )}
            </>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
