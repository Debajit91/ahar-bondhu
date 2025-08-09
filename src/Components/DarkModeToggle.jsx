import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
    const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (
      saved === "dark" ||
      (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDark(true);
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-white", "text-black");
    } else {
      document.body.classList.add("bg-white", "text-black");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  }, []);

  const toggle = () => {
    if (dark) {
      document.body.classList.remove("bg-gray-900", "text-white");
      document.body.classList.add("bg-white", "text-black");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-white", "text-black");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <button
      onClick={toggle}
      className="ml-4 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
      aria-label="Toggle Dark Mode"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
    );
};

export default DarkModeToggle;