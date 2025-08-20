import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaFacebookF,FaWhatsapp  } from "react-icons/fa";

const ContactSupport = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_sthsgic",
        "template_gx1k1cs",
        formRef.current,
        "vzok71lbFmQh4gEDw"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
          setLoading(false);
          formRef.current.reset();
        },
        (error) => {
          console.log(error.text);
          setSuccess(false);
          setLoading(false);
        }
      );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
      <h2 className="text-3xl font-bold text-center text-[#0d0d0e] mb-8">
        Contact / Support
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-[#8b8bb5] p-6 rounded-xl shadow-lg">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="user_name"
              placeholder="আপনার নাম"
              required
              className="w-full px-4 py-2 rounded border focus:outline-none"
            />
            <input
              type="email"
              name="user_email"
              placeholder="আপনার ইমেইল"
              required
              className="w-full px-4 py-2 rounded border focus:outline-none"
            />
            <textarea
              name="message"
              placeholder="আপনার মেসেজ"
              required
              rows={5}
              className="w-full px-4 py-2 rounded border focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded hover:scale-105 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {success && (
              <p className="text-green-700 font-semibold mt-2">Message sent successfully!</p>
            )}
          </form>
        </div>

        {/* Map + Contact Info */}
        <div className="space-y-6">
          <div className="w-full h-64 rounded overflow-hidden shadow-lg">
          <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.000000000000!2d90.3535!3d22.7010!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c9a1abcd1234%3A0xabcdef1234567890!2sBarisal%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1691800000000!5m2!1sen!2sus"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
/>

          </div>

          <div className="bg-[#8b8bb5] p-4 rounded shadow-lg text-[#0d0d0e]">
            <h3 className="font-semibold text-lg mb-2">Support Info</h3>
            <p>Email: hossainmdsaeyd@gmail.com</p>
            <p>Phone: +018-976-01542</p>
          </div>

          <div className="flex space-x-4 text-[#0d0d0e]">
  {/* Facebook Link */}
  <a
    href="https://www.facebook.com/profile.php?id=61578782983614"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-purple-700"
  >
    <FaFacebookF size={24} />
  </a>

  {/* WhatsApp Link */}
  <a
    href="https://wa.me/8801897601542"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-green-600"
  >
    <FaWhatsapp size={24} />
  </a>
</div>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
