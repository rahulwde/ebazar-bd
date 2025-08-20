import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    product: "Mini Fan",
    name: "মোঃ রাশেদুল ইসলাম",
    image: "/src/assets/client1.jpg",
    review:
      "Mini Fanটি খুবই কার্যকর। গরমে ব্যবহার করা একদম উপযুক্ত। দামও সাশ্রয়ী।",
    rating: 5,
  },
  {
    id: 2,
    product: "Table Lamp",
    name: "সুমাইয়া খান",
    image: "/src/assets/client2.jpg",
    review:
      "Table Lampটি আমার স্টাডি টেবিলে খুব ভালো দেখাচ্ছে। আলো পর্যাপ্ত এবং চোখে চাপ কম।",
    rating: 4,
  },
  {
    id: 3,
    product: "Headphone",
    name: "আরিফুল ইসলাম",
    image: "/src/assets/client3.jpg",
    review:
      "Headphoneটির সাউন্ড কোয়ালিটি অসাধারণ। বাজেট অনুযায়ী পারফেক্ট।",
    rating: 5,
  },
  {
    id: 4,
    product: "Airpod",
    name: "নাজমুল হাসান",
    image: "/src/assets/client4.jpg",
    review:
      "Airpod খুব আরামদায়ক এবং কান-এ ভালো ফিট হয়। ব্যাটারি সময়ও ভালো।",
    rating: 5,
  },
  {
    id: 5,
    product: "Neckband",
    name: "ফারহানা সুলতানা",
    image: "/src/assets/client5.jpg",
    review:
      "Neckbandটি হালকা ও আরামদায়ক। ব্যাটারি লাইফ দীর্ঘ এবং সাউন্ড ক্লিয়ার।",
    rating: 4,
  },
  // নতুন প্রোডাক্ট যোগ করলাম
  {
    id: 6,
    product: "Digital Clock",
    name: "রিফাত হোসেন",
    image: "/src/assets/client6.jpg",
    review: "Digital Clockটি অত্যন্ত কার্যকর। সময় দেখানো সহজ এবং ডিজাইন সুন্দর।",
    rating: 5,
  },
  {
    id: 7,
    product: "Birthday Gift",
    name: "সাবিনা পারভীন",
    image: "/src/assets/client7.jpg",
    review: "Birthday Giftটি খুবই সুন্দর এবং উপহার দেওয়ার জন্য পারফেক্ট।",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Our Client Say
      </h2>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }} // slide left
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" },
          }}
        >
          {/* double copy to make infinite loop smooth */}
          {[...testimonials, ...testimonials].map((testimonial) => (
            <motion.div
              key={testimonial.id + Math.random()} // unique key
              className="min-w-[250px] bg-[#00fff5] text-[#0d0d0e] p-6 rounded-xl shadow-lg hover:shadow-2xl flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-3 object-cover"
              />
              <h3 className="font-semibold text-lg mb-1">{testimonial.name}</h3>
              <p className="text-sm font-medium mb-2">
                <span className="font-bold">{testimonial.product}:</span> {testimonial.review}
              </p>
              <div className="flex space-x-1">
                {Array.from({ length: testimonial.rating }).map((_, idx) => (
                  <span key={idx} className="text-yellow-400">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - testimonial.rating }).map((_, idx) => (
                  <span key={idx} className="text-gray-300">★</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
