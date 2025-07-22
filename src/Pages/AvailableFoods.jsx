import { useEffect, useState } from "react";
import { Link } from "react-router";
import axiosInstance from "../Api/axiosInstance";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [sortByDate, setSortByDate] = useState(false);
  

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axiosInstance.get(
          `/foods?sortBy=${sortByDate ? "expireDate" : ""}`
        );
        setFoods(res.data);
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      }
    };

    fetchFoods();
  }, [sortByDate]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Sorting */}
      <div className="mb-6 flex justify-end">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => setSortByDate(!sortByDate)}
        >
          {sortByDate ? "Clear Sort" : "Sort by Expire Date"}
        </button>
      </div>

      {/* Food Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col justify-between"
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full h-40 object-cover rounded"
            />
            <div className="mt-4">
              <h3 className="text-xl font-semibold">{food.foodName}</h3>
              <p className="text-sm text-gray-600">Quantity: {food.quantity} Plates/Pkts</p>
              <p className="text-sm text-gray-600">
                Expire Date: {new Date(food.expiredAt).toLocaleString()}
              </p>
            </div>
            <Link to={`/foods/${food._id}`}>
              <button className="btn btn-sm mt-4 w-full">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
