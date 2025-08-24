import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaSadTear, FaDownload } from "react-icons/fa";
import { AuthContext } from "../Context/Authcontext";

const MyInvoices = () => {
  const { user } = useContext(AuthContext);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    axios
      .get("https://ecommerce-backend-one-omega.vercel.app/invoices")
      .then((res) => {
        const userInvoices = res.data.filter((inv) => inv.userEmail === user.email);
        setInvoices(userInvoices);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const downloadInvoice = (invoice) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Invoice ID: ${invoice._id}`, 10, 35);
    doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 10, 42);
    doc.text(`Total: ৳${invoice.totalAmount || 0}`, 10, 49);
    doc.text(`Advance Paid: ৳${invoice.advancePayment || 0}`, 10, 56);
    if (invoice.transactionId) doc.text(`Transaction ID: ${invoice.transactionId}`, 10, 63);

    const customer = invoice.customer || {};
    doc.text(`Customer: ${customer.name || "N/A"}`, 10, 75);
    doc.text(`Email: ${customer.email || "N/A"}`, 10, 82);
    doc.text(`Phone: ${customer.phone || "N/A"}`, 10, 89);
    doc.text(`Address: ${customer.address || "N/A"}`, 10, 96);

    // Items table
    const tableColumn = ["#", "Product Name", "Qty", "Price", "Total"];
    const tableRows = [];

    (invoice.items || []).forEach((item, index) => {
      const name = item.productName || item.name || "N/A";
      const qty = item.quantity || 0;
      const price = item.price || item.sellPrice || 0;
      const total = qty * price;
      tableRows.push([index + 1, name, qty, `৳${price}`, `৳${total}`]);
    });

    autoTable(doc, {
      startY: 110,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save(`invoice_${invoice._id}.pdf`);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Loading...</p>;

  if (!invoices.length)
    return (
      <div className="text-center mt-10 text-gray-700">
        <FaSadTear size={50} className="mx-auto mb-4 text-gray-400" />
        <p className="text-lg font-semibold">আপনি এখনও কোনো order করেননি</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      {invoices.map((inv) => (
        <div
          key={inv._id}
          className="p-4 border rounded shadow-md flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0"
        >
          <div>
            <p><strong>Invoice ID:</strong> {inv._id}</p>
            <p><strong>Date:</strong> {new Date(inv.createdAt).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ৳{inv.totalAmount}</p>
            <p><strong>Advance Paid:</strong> ৳{inv.advancePayment}</p>
          </div>

          <button
            onClick={() => downloadInvoice(inv)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <FaDownload /> Download PDF
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyInvoices;
