import React, { useEffect, useState } from 'react';
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

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
      className="bg-primary p-1 rounded-full cursor-pointer"
      aria-label="Toggle Dark Mode"
    >
      {dark ? <HiOutlineSun size={20}/> : <HiOutlineMoon size={20}/>}
    </button>
    );
};

export default DarkModeToggle;