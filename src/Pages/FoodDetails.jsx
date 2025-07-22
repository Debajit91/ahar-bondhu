import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axiosInstance from "../Api/axiosInstance";
import { toast } from "react-toastify";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [notes, setNotes] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axiosInstance.get(`/foods/${id}`);
        setFood(res.data);
      } catch (err) {
        toast.error("Food not found");
        navigate("/foods");
      }
    };
    fetchFood();
  }, [id, navigate]);

  const handleRequest = async () => {
    const requestData = {
      foodId: food._id,
      foodName: food.foodName,
      foodImage: food.foodImage,
      donorEmail: food.donorEmail,
      donorName: food.donorName,
      userEmail: user.email,
      requestDate: new Date().toISOString(),
      pickupLocation: food.pickupLocation,
      expireDate: food.expiredAt,
      notes: notes,
    };

    try {
      await axiosInstance.patch(`/foods/request/${food._id}`, requestData); // Update food status
      toast.success("Food requested successfully!");
      navigate("/my-requests"); // optional
    } catch (err) {
      toast.error("Request failed!");
    }
  };

  if (!food) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={food.foodImage}
        alt={food.foodName}
        className="w-full h-110 object-cover rounded"
      />
      <h2 className="text-2xl font-bold mt-4">{food.foodName}</h2>
      <p className="text-gray-600">Quantity: {food.quantity}</p>
      <p className="text-gray-600">Pickup Location: {food.pickupLocation}</p>
      <p className="text-gray-600">
        Expire Date: {new Date(food.expiredAt).toLocaleString()}
      </p>
      <p className="text-gray-600">
        Donor: {food.donorName} ({food.donorEmail})
      </p>

      <button
        className="btn btn-primary mt-6"
        onClick={() => setOpenModal(true)}
      >
        Request
      </button>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg space-y-4 relative">
            <h3 className="text-xl font-bold mb-2">Request Food</h3>
            <button
              className="absolute top-2 right-3 text-lg font-bold"
              onClick={() => setOpenModal(false)}
            >
              ✕
            </button>

            {/* Read-only fields */}
            <div className="space-y-2">
              <p>
                <strong>Food Name:</strong> {food.foodName}
              </p>
              <p>
                <strong>Food ID:</strong> {food._id}
              </p>
              <p>
                <strong>Donor Name:</strong> {food.donorName}
              </p>
              <p>
                <strong>Donor Email:</strong> {food.donorEmail}
              </p>
              <p>
                <strong>User Email:</strong> {user.email}
              </p>
              <p>
                <strong>Pickup Location:</strong> {food.pickupLocation}
              </p>
              <p>
                <strong>Expire Date:</strong>{" "}
                {new Date(food.expiredAt).toLocaleString()}
              </p>
              <p>
                <strong>Request Date:</strong> {new Date().toLocaleString()}
              </p>
            </div>

            {/* Editable */}
            <textarea
              placeholder="Additional Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="textarea textarea-bordered w-full"
            />

            <button className="btn btn-success w-full" onClick={handleRequest}>
              Confirm Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
