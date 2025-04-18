import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'; // Social media icons

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">CrypCompare</h2>
          <p className="text-sm">
            Track, convert and stay updated with your favorite cryptocurrencies in real-time.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-500 transition-colors" aria-label="Go to home page">Home</Link>
            </li>
            <li>
              <Link to="/convert" className="hover:text-blue-500 transition-colors" aria-label="Go to converter page">Converter</Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-blue-500 transition-colors" aria-label="Go to news page">News</Link>
            </li>
          </ul>
        </div>

        {/* Contact / Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-sm">Email: support@cryptomarket.com</p>
          <p className="text-sm">Twitter: @cryptomarket</p>
          <p className="text-sm">Location: Internet 🌐</p>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 py-4">
        <a href="https://twitter.com/cryptomarket" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
          <FaTwitter size={24} />
        </a>
        <a href="https://github.com/cryptomarket" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
          <FaGithub size={24} />
        </a>
        <a href="https://linkedin.com/company/cryptomarket" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-blue-500">
          <FaLinkedin size={24} />
        </a>
      </div>

      <div className="text-center py-4 border-t border-gray-300 dark:border-gray-700 text-sm">
        © {new Date().getFullYear()} CryptoMarket. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
