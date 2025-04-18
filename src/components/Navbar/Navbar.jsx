import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { CoinContext } from "../../context/CoinContext";
import DarkModeToggle from "../DarkModeToggle";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const currencyHandler = (e) => {
    const selected = e.target.value;
    const symbols = { usd: "$", eur: "€", inr: "₹" };
    setCurrency({ nam: selected, symbol: symbols[selected] || "$" });
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Converter", path: "/convert" },
    { name: "News", path: "/news" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-4 flex justify-between items-center sm:gap-30">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
        <img
            src={logo}
            alt="CryptoMarket Logo"
            className="h-9 sm:mr-105"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 sm:pr-30">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-200 font-medium ${
                  location.pathname === item.path
                    ? "text-blue-600 font-semibold"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Currency Dropdown (Desktop) */}
        <div className="hidden md:block ml-4">
          <select
            onChange={currencyHandler}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="usd">USD</option>
            <option value="eur">EURO</option>
            <option value="inr">INR</option>
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <div className="ml-4 hidden md:block">
          <DarkModeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className=" md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-gray-700 dark:text-white hover:text-blue-500 ${
                    location.pathname === item.path
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Currency Dropdown */}
          <select
            onChange={currencyHandler}
            className="w-full mt-2 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="usd">USD</option>
            <option value="eur">EURO</option>
            <option value="inr">INR</option>
          </select>

          {/* Dark Mode Toggle */}
          <div className="mt-2">
            <DarkModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
