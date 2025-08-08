import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import axiosInstance from "../Api/axiosInstance";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/firebase.init";

const GoogleButton = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        try {
          await axiosInstance.post("/users/register", userData);
        } catch (err) {
          console.error("User register error:", err);
        }
        toast.success("Logged in with Google");
        navigate("/");
      }
    });

    return ()=> unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="btn btn-outline w-full flex items-center gap-2"
    >
      <FcGoogle size={20} /> Continue with Google
    </button>
  );
};

export default GoogleButton;
