import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "8801897601542";  
  const message = "Hello! I want to contact you.";  
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse"
      style={{
        background: "linear-gradient(45deg, #25D366, #128C7E, #25D366)",
        backgroundSize: "200% 200%",
        animation: "wave 2s infinite",
      }}
    >
      <FaWhatsapp size={28} color="white" />
      <style>
        {`
          @keyframes wave {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>
    </a>
  );
};

export default WhatsAppButton;
