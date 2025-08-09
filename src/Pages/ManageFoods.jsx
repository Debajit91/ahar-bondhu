import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../Api/axiosInstance";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";


const ManageFoods = () => {
  const { user } = useAuth();
  const [myFoods, setMyFoods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    axiosInstance
      .get(`/foods/user?email=${user.email}`)
      .then((res) => setMyFoods(res.data))
      .catch((err) => toast.error("Failed to load foods:", err));
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this food?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosInstance.delete(`/foods/${id}`);
        setMyFoods((prev) => prev.filter((food) => food._id !== id));
        Swal.fire("Deleted!", "Your food has been deleted.", "success");
      } catch (err) {
        toast.error("Delete failed:", err);
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl text-center font-bold mb-4">Manage Your Foods</h2>
      {myFoods.length === 0 ? (
        <p className="text-center">No foods added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Food Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Expire Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myFoods.map((food) => (
                <tr key={food._id}>
                  <td className="border px-4 py-2">{food.foodName}</td>
                  <td className="border px-4 py-2">{food.status}</td>
                  <td className="border px-4 py-2">
                    {new Date(food.expiredAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                   
                      <button
                        onClick={() => {
                          setSelectedFood(food);
                          setIsModalOpen(true);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Update
                      </button>
                    
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isModalOpen && selectedFood && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Update Food</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target;
                    const updatedFood = {
                      foodName: form.foodName.value,
                      pickupLocation: form.pickupLocation.value,
                      expiredAt: form.expiredAt.value,
                    };

                    try {
                      await axiosInstance.patch(
                        `/foods/${selectedFood._id}`,
                        updatedFood
                      );
                      // Refresh data
                      const res = await axiosInstance.get(
                        `/foods/user?email=${user.email}`
                      );
                      setMyFoods(res.data);
                      setIsModalOpen(false);
                      Swal.fire("Success", "Food updated!", "success");
                    } catch (err) {
                      Swal.fire("Error", "Failed to update", "error");
                    }
                  }}
                >
                  <div className="mb-2">
                    <label className="block font-semibold">Food Name</label>
                    <input
                      name="foodName"
                      defaultValue={selectedFood.foodName}
                      className="w-full border px-2 py-1 rounded"
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block font-semibold">
                      Pickup Location
                    </label>
                    <input
                      name="pickupLocation"
                      defaultValue={selectedFood.pickupLocation}
                      className="w-full border px-2 py-1 rounded"
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label className="block font-semibold">Expire Date</label>
                    <input
                      name="expiredAt"
                      type="date"
                      defaultValue={selectedFood.expiredAt?.split("T")[0]}
                      className="w-full border px-2 py-1 rounded"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageFoods;
