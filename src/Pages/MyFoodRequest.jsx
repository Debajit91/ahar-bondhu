import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import axiosInstance from "../Api/axiosInstance";

const MyFoodRequest = () => {
  const { user } = useAuth();
  const [requestedFoods, setRequestedFoods] = useState([]);

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const res = await axiosInstance.get(
          `/foods/my-requests?email=${user?.email}`
        );
        console.log("requested foods:", res.data);
        setRequestedFoods(res.data);
      } catch (err) {
        console.error("Failed to fetch requested foods:", err);
      }
    };

    if (user?.email) {
      fetchMyRequests();
    }
  }, [user]);

  if (!requestedFoods || requestedFoods.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No requested foods found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {requestedFoods.map((food) => (
        <div key={food._id} className="bg-white rounded-lg shadow p-4">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-full h-48 object-cover rounded"
          />
          <h3 className="text-xl font-bold mt-2">{food.foodName}</h3>
          <p className="text-gray-600">Donor: {food.donorName}</p>
          <p className="text-gray-600">
            Pickup Location: {food.pickupLocation}
          </p>
          <p className="text-gray-600">
            Request Date: {new Date(food.requestDate).toLocaleString()}
          </p>
          <p className="text-gray-600">
            Expire Date: {new Date(food.expiredAt).toLocaleString()}
          </p>
          {food.notes && (
            <p className="text-gray-500 mt-2 italic">Notes: {food.notes}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyFoodRequest;
