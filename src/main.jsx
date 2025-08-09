import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./Contexts/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-merriweather bg-gradient-to-r from-green-50 to-blue-50">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" />
      </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
