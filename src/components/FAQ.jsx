import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "প্রোডাক্টের গ্যারান্টি কতদিন?",
    answer: "আমাদের সব ইলেকট্রনিক প্রোডাক্টের ৬ মাস থেকে ১ বছরের গ্যারান্টি থাকে।",
  },
  {
    question: "আমি কি প্রোডাক্ট রিটার্ন করতে পারি?",
    answer: "হ্যাঁ, আপনি প্রোডাক্টটি ৭ দিনের মধ্যে রিটার্ন করতে পারবেন যদি এটি অ-ব্যবহৃত এবং অক্ষত অবস্থায় থাকে।",
  },
  {
    question: "ডেলিভারি কতদিনে হবে?",
    answer: "বাংলাদেশের ভিতরে ডেলিভারি সাধারণত ২–৫ কার্যদিবসের মধ্যে হয়।",
  },
  {
    question: "ইন্টারন্যাশনাল শিপিং আছে কি?",
    answer: "হ্যাঁ, আমরা ক্রস-বর্ডার শিপিং সাপোর্ট করি। বিস্তারিত জানতে আমাদের কাস্টমার সার্ভিসে যোগাযোগ করুন।",
  },
  {
    question: "পেমেন্ট মোড কি কি আছে?",
    answer: "আমরা ক্রেডিট/ডেবিট কার্ড, বিকাশ, নগদ এবং পেপাল পেমেন্ট গ্রহণ করি।",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#0d0d0e]">
        Frequently Asked Questions (FAQ)
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#8b8bb5] text-[#0d0d0e] rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
            >
              <span className="font-semibold">{faq.question}</span>
              <span>{activeIndex === index ? "−" : "+"}</span>
            </button>

            {/* AnimatePresence adds exit animation */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-4 border-t border-gray-300"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
