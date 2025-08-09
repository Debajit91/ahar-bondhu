import React from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Logo from "/Logo.png";
import animationData from "../assets/Login.json";

import { toast } from "react-toastify";
import Lottie from "lottie-react";
import useAuth from "../Hooks/useAuth";
import GoogleButton from "../Components/GoogleButton";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signIn(email, password);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center text-gray-900 px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-base-100 shadow-xl rounded-lg overflow-hidden">
        {/* Left: Animation */}
        <div className="md:w-1/2 bg-base-200 flex items-center justify-center p-6">
          <Lottie
            play="true"
            loop
            animationData={animationData}
            className="w-full max-w-md"
          />
        </div>

        {/* Right: Login Form */}
        <div className="md:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                {...register("email")}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password")}
                className="input input-bordered w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <div className="divider">OR</div>
          <GoogleButton />

          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
