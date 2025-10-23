import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import axiosInstance from "../Api/axiosInstance";
import RequestModal from "../Components/RequestModal";
import LoaderSpinner from "../Components/LoaderSpinner";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { data: food, isLoading, isError } = useQuery({
    queryKey: ["foodDetails", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/foods/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoaderSpinner/>;
  if (isError || !food) return <p>Food not found!</p>;

  const handleRequestClick = () => {
    if (user?.email) {
      setShowModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{food.foodName}</h2>
      <img src={food.foodImage} alt={food.foodName} className="w-full h-116 object-cover rounded mb-4" />
      <p><strong>Location:</strong> {food.pickupLocation}</p>
      <p><strong>Donor:</strong> {food.donorName} ({food.donorEmail})</p>
      <p><strong>Expire Date:</strong> {food.expiredAt?.slice(0, 10)}</p>

      <button
        onClick={handleRequestClick}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Request
      </button>

      {showModal && (
        <RequestModal food={food} closeModal={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default FoodDetails;
