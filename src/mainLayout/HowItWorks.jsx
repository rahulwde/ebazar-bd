import React from "react";
import { motion } from "framer-motion";
import { FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Delivery Process",
    description:
      "আমাদের দ্রুত ডেলিভারি সার্ভিস: দেশের ভিতরে মাত্র ৩ দিনের মধ্যে আপনার প্রোডাক্ট পৌঁছে যাবে।",
    icon: <FaShippingFast size={40} className="text-white" />,
    bg: "bg-gradient-to-r from-purple-500 to-indigo-500",
  },
  {
    id: 2,
    title: "Warranty & Replacement",
    description:
      "প্রোডাক্টের সাথে আসে ৩ দিনের মধ্যে রিটার্ন বা রিপ্লেসমেন্ট সুবিধা। নিশ্চিন্তে কিনুন।",
    icon: <FaShieldAlt size={40} className="text-white" />,
    bg: "bg-gradient-to-r from-green-400 to-blue-500",
  },
  {
    id: 3,
    title: "Customer Support",
    description:
      "আমাদের কাস্টমার সার্ভিস সবসময় আপনার পাশে। কোনো সমস্যা হলে মাত্র কয়েক মিনিটের মধ্যে সমাধান।",
    icon: <FaHeadset size={40} className="text-white" />,
    bg: "bg-gradient-to-r from-yellow-400 to-orange-500",
  },
];

const HowItWorks = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-[#0d0d0e]">
        How It Works / Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.id}
            className={`p-6 rounded-xl shadow-lg flex flex-col items-center text-center ${feature.bg}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-white">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
