import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from '../Hooks/useAuth';


const GoogleButton = () => {
    const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      toast.success("Logged in with Google");
      navigate("/");
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