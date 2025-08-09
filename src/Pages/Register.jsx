import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import useAuth from "../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import Lottie from "lottie-react";
import animationData from "../assets/Registration-animation.json";
import Logo from "/Logo.png";
import GoogleButton from "../Components/GoogleButton";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  photo: yup
    .string()
    .url("Must be a valid URL")
    .required("Photo URL is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .matches(
      passwordRegex,
      "Password must have at least 6 characters, including uppercase and lowercase letters"
    )
    .required("Password is required"),
});
const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const { name, email, password, photoURL } = data;
    setLoading(true);
    try {
      const userCredential = await createUser(email, password);
      await updateUserProfile({
        displayName: name,
        photoURL,
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex max-w-7xl mx-auto px-5">
      <ToastContainer position="top-center" />

      {/* Left: Form */}
      <div className="flex flex-col justify-center items-center w-full max-w-md p-8 bg-white shadow-lg text-black">
        <img className="w-50" src={Logo} alt="Ahar Bondhu" />
        <h2 className="text-3xl font-bold mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              {...register("name")}
              className="input input-bordered w-full"
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-1 font-medium">Photo URL</label>
            <input
              type="text"
              {...register("photo")}
              className="input input-bordered w-full"
              disabled={loading}
            />
            {errors.photo && (
              <p className="text-red-600 text-sm mt-1">
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="input input-bordered w-full"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              className="input input-bordered w-full"
              disabled={loading}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          >
            Register
          </button>
        </form>
        <div className="divider">OR</div>
        <GoogleButton />

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>

      {/* Right: Animated Image */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-tr from-primary to-secondary">
        {/* You can replace this with any animated gif or Lottie animation */}
        <Lottie
          animationData={animationData}
          loop={true}
          className="max-w-full max-h-[500px]"
        />
      </div>
    </div>
  );
};

export default Register;