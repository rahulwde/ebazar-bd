import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import Swal from "sweetalert2";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Chip,
} from "@mui/material";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce-backend-one-omega.vercel.app/orders/all"
      );
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

  // Approve Order
  const handleApprove = async (orderId) => {
    try {
      const res = await axios.put(
        `https://ecommerce-backend-one-omega.vercel.app/orders/${orderId}`,
        {
          status: "approved",
        }
      );

      if (res.status === 200) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: "approved" } : o
          )
        );
        Swal.fire("✅ Approved!", "Order approved successfully.", "success");
      }
    } catch (err) {
      console.error("Error approving order:", err);
      Swal.fire("❌ Error", "Failed to approve order.", "error");
    }
  };

  // Reject Order (Delete)
  const handleReject = async (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `https://ecommerce-backend-one-omega.vercel.app/orders/${orderId}`
          );
          if (res.status === 200) {
            setOrders((prev) => prev.filter((o) => o._id !== orderId));
            Swal.fire("Deleted!", "Order has been deleted.", "success");
          }
        } catch (err) {
          console.error("Error deleting order:", err);
          Swal.fire("❌ Error", "Failed to delete order.", "error");
        }
      }
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">All Orders</h2>

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card className="shadow-lg rounded-lg">
              {order.items[0]?.image && (
                <CardMedia
                  component="img"
                  height="20"
                  image={order.items[0].image}
                  alt={order.items[0].productName}
                  style={{ objectFit: "cover" }}
                />
              )}
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <Typography variant="h6">{order.customer?.name}</Typography>
                  <Chip
                    label={order.status}
                    color={
                      order.status === "pending"
                        ? "warning"
                        : order.status === "approved"
                        ? "success"
                        : "error"
                    }
                  />
                </div>

                <Typography variant="body2" color="textSecondary">
                  📧 {order.customer?.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  📞 {order.customer?.phone}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  🏠 {order.customer?.address}
                </Typography>

                <div className="mt-2">
                  <Typography variant="subtitle2" className="font-semibold">
                    Items:
                  </Typography>
                  <ul className="list-disc ml-5">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.productName} x {item.quantity} - ৳
                        {item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                <Typography
                  variant="h6"
                  className="mt-2 font-semibold text-green-700"
                >
                  Total: {order.totalPrice}
                </Typography>

                {order.paymentProof && (
                  <div className="mt-2">
                    <Typography variant="subtitle2" className="font-semibold">
                      Payment Proof:
                    </Typography>
                    <img
                      src={order.paymentProof}
                      alt="Payment Proof"
                      className="w-32 h-32 object-cover rounded mt-1"
                    />
                  </div>
                )}

                {order.status === "pending" && (
                  <div className="flex justify-between mt-4">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(order._id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleReject(order._id)}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
