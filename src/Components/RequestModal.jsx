import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import axiosInstance from "../Api/axiosInstance";

const RequestModal = ({ food, closeModal }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const {
    foodName,
    foodImage,
    _id,
    donorEmail,
    donorName,
    pickupLocation,
    expiredAt,
  } = food;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      return await axiosInstance.patch(`/foods/request/${_id}`, {
        userEmail: user.email,
        requestDate: new Date(),
        notes: data.notes,
      });
    },
    onSuccess: () => {
      Swal.fire("Success", "Food requested", "success");
      queryClient.invalidateQueries(["featuredFoods"]);
      closeModal();
    },
    onError: () => {
      Swal.fire("Error", "Could not request food", "error");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-red-500 font-bold text-xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4">Request Food</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          <input className="input" value={foodName} disabled />
          <input className="input" value={_id} disabled />
          <input className="input" value={donorName} disabled />
          <input className="input" value={donorEmail} disabled />
          <input className="input" value={user.email} disabled />
          <input className="input" value={pickupLocation} disabled />
          <input className="input" value={expiredAt?.slice(0, 10)} disabled />
          <input className="input" value={new Date().toLocaleString()} disabled />
          <img src={foodImage} alt="Food" className="col-span-2 h-32 object-cover rounded" />

          <textarea
            className="textarea textarea-bordered col-span-2"
            placeholder="Additional Notes"
            {...register("notes", { required: true })}
          />
          {errors.notes && <p className="text-red-500 text-sm col-span-2">Note is required</p>}

          <button
            type="submit"
            className="col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Requesting..." : "Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestModal;
