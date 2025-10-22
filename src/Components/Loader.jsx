import React from "react";
import { motion } from "framer-motion";
import Logo from "../../public/Logo.png";

const Loader = () => {
    return (
        <div
            className="bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center h-screen"
            style={{
                backgroundImage:
                    "linear-gradient(to right, rgba(230,252,249,0.8), rgba(249,250,251,0.8)), url('https://i.ibb.co.com/tpMYtXzT/Food-Sharing.jpg')",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                backgroundBlendMode: "overlay",
            }}
        >
            <div className="relative w-50 h-50 flex items-center justify-center">
                {/* Static Border */}
                <div className="absolute inset-0 rounded-full border-8 border-accent"></div>

                {/* Rotating Border */}
                <motion.div
                    className="absolute inset-0 rounded-full border-8 border-transparent"
                    style={{
                        borderTopColor: "#497D74",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Logo */}
                <div className="w-50 h-50 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <img src={Logo} alt="Logo" className="w-50 h-50 object-contain p-3" />
                </div>
            </div>
        </div>
    );
};

export default Loader;
