import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled in localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(savedMode === 'true');
      if (savedMode === 'true') document.body.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  return (
    <label className="flex items-center cursor-pointer">
      <span className="mr-2 text-xl dark:text-white">
        {darkMode ? '🌙' : '🌞'}
      </span>
      <div className="relative">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode}
          className="sr-only"
        />
        <div className="w-12 h-6 bg-gray-300 rounded-full dark:bg-gray-700 flex items-center">
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              darkMode ? 'translate-x-6' : ''
            }`}
          ></div>
        </div>
      </div>
    </label>
  );
};

export default DarkModeToggle;
