import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";
import axiosInstance from "../Api/axiosInstance";

const AddFood = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth(); 
  

  const onSubmit = async (data) => {
    const foodData = {
      ...data,
      donorName: user?.displayName,
      donorEmail: user?.email,
      donorImage: user?.photoURL,
      status: "available",
    };

    try {
      const res = await axiosInstance.post("/foods", foodData);
      if (res.data.insertedId) {
        toast.success("Food added successfully!");
        reset();
      }
    } catch (err) {
      toast.error("Failed to add food.", err);
      
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4">Add Food</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("foodName", { required: true })} placeholder="Food Name" className="input input-bordered w-full" />
        <input {...register("foodImage", { required: true })} placeholder="Food Image URL" className="input input-bordered w-full" />
        <input type="number" {...register("quantity", { required: true })} placeholder="Food Quantity" className="input input-bordered w-full" />
        <input {...register("pickupLocation", { required: true })} placeholder="Pickup Location" className="input input-bordered w-full" />
        <input type="datetime-local" {...register("expiredAt", { required: true })} className="input input-bordered w-full" />
        <textarea {...register("notes")} placeholder="Additional Notes" className="textarea textarea-bordered w-full" />
        <button className="btn btn-primary w-full">Add Food</button>
      </form>
    </div>
  );
};

export default AddFood;
