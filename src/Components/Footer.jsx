import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Logo from "/Logo.png";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Logo */}
        <div className="flex flex-col items-start">
          <img src={Logo} alt="Logo" className="w-24 mb-4" />
          <p className="text-sm">
            Ahar Bondhu <br />
            Sharing food with love and care.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/available-foods" className="hover:underline">Available Foods</Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </li>
          </ul>
        </div>

        {/* Right: Social Links */}
        <div className="flex flex-col items-end">
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-3">
            <a href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer" aria-label="Twitter" className="hover:text-sky-500">
              <FaTwitter />
            </a>
            <a href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-800">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="text-center py-4 bg-base-300 text-sm">
        © {new Date().getFullYear()} Ahar Bondhu. All rights reserved.
      </div>
    </footer>
  );
}
