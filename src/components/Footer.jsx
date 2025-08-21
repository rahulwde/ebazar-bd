import { BsCart4 } from "react-icons/bs";
import { FaFacebookF, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:justify-between">
        
        {/* Logo & Name */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[#0066ff] transition duration-300"
        >
          <BsCart4 size={28} />
          <div className="leading-5 text-left font-bold text-[18px]">
            <span className="text-white">Digital</span>
            <br />
            <span>
              Bazar <span className="text-[#00aa55]">BD</span>
            </span>
          </div>
        </Link>

        {/* Social & Contact Links */}
        <div className="flex flex-col items-center md:items-end gap-4 mt-4 md:mt-0">
          {/* Social icons */}
          <div className="flex gap-6">
            <a 
              href="https://www.facebook.com/profile.php?id=61578782983614" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-500 transition"
            >
              <FaFacebookF size={22} />
            </a>
            <a 
              href="mailto:hossainmdsaeyd@gmail.com" 
              className="hover:text-red-500 transition"
            >
              <FaEnvelope size={22} />
            </a>
            <a 
              href="https://wa.me/8801897601542" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-green-500 transition"
            >
              <FaWhatsapp size={22} />
            </a>
            <a 
              href="tel:+8801897601542" 
              className="hover:text-yellow-400 transition"
            >
              <FaPhoneAlt size={22} />
            </a>
          </div>

          {/* Address */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FaMapMarkerAlt size={16} className="text-red-500" />
            <span>Shankarpur, Guthia 8200, Barishal</span>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-500 w-full">
        © {new Date().getFullYear()} Digital Bazar BD. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
