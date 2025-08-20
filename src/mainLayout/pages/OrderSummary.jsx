import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/Authcontext";
import { TextField, Button, Typography, Box, Card, CardContent } from "@mui/material";

export default function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  const { user } = useContext(AuthContext);

  if (!order) {
    return (
      <Box className="max-w-3xl mx-auto p-4 text-center">
        <Typography variant="h5" mb={2}>No Order Found</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate("/cart")}>
          Go to Cart
        </Button>
      </Box>
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
      const apiKey = "26f7c897fe17caa771f71e53acc91721";
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, form);
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
          `Your order is placed. Advance payment: ৳${formData.advancePayment}`,
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
    <Box
      className="max-w-3xl mx-auto p-4 space-y-6"
      sx={{
        background: 'linear-gradient(135deg, #00fff5, #39ff14)',
        color: '#000',
        borderRadius: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
        Order Summary
      </Typography>

      {/* Order Items */}
      <Box display="flex" flexDirection="column" gap={2}>
        {order.items.map((item, index) => (
          <Card
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1,
              background: 'linear-gradient(135deg, #f95f35, #e7552f)',
              color: '#fff',
              transition: '0.3s',
              '&:hover': { transform: 'scale(1.03)', boxShadow: 6 }
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover rounded" />
              <Box>
                <Typography fontWeight="bold">{item.productName}</Typography>
                <Typography fontWeight="bold">Price: ৳{item.price}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography fontWeight="bold">Total: ৳{item.price * item.quantity}</Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      <Typography variant="h6" fontWeight="bold" textAlign="right">
        Total Price: ৳{order.totalPrice}
      </Typography>

      {/* User Details Form */}
      <Card sx={{ p: 3, background: 'rgba(255,255,255,0.9)', color: '#000' }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" mb={2}>Your Details</Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth variant="outlined" sx={{backgroundColor: '#e0f7fa'}} />
            <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth variant="outlined" sx={{backgroundColor: '#e0f7fa'}} />
            <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth variant="outlined" sx={{backgroundColor: '#e0f7fa'}} />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              sx={{backgroundColor: '#e0f7fa'}}
            />

            {/* Advance Payment as Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: 'linear-gradient(to right, #00fff5, #39ff14)',
                fontWeight: 'bold',
                cursor: 'default',
                '&:hover': { background: 'linear-gradient(to right, #00fff5, #39ff14)' },
              }}
            >
              Advance Payment: ৳{formData.advancePayment}
            </Button>

            <TextField
              label="Transaction ID (Optional)"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{backgroundColor: '#e0f7fa'}}
            />

            <Box>
              <Typography mb={1}>Payment Proof (Image)</Typography>
              <input type="file" accept="image/*" onChange={handleFileUpload} />
              {formData.paymentProof && (
                <img src={formData.paymentProof} alt="Payment Proof" className="w-32 mt-2 rounded" />
              )}
            </Box>

            <Button
              onClick={handleConfirmOrder}
              disabled={isSubmitDisabled}
              variant="contained"
              sx={{
                mt: 2,
                background: isSubmitDisabled ? 'gray' : 'linear-gradient(to right, #00fff5, #39ff14)',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': {
                  background: isSubmitDisabled ? 'gray' : 'linear-gradient(to right, #39ff14, #00fff5)'
                }
              }}
            >
              Confirm Order
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
