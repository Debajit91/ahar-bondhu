import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./Contexts/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from "./Components/Loader.jsx";

const queryClient = new QueryClient();

//Loader container
const AppWrapper = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <ToastContainer position="top-right" />
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Loader />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <RouterProvider router={router} />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

//Loader container


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-merriweather">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>        
        <AppWrapper/>
      </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
