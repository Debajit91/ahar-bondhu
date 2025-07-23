import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import axiosInstance from "../Api/axiosInstance";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [sortByDate, setSortByDate] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [columns, setColumns] = useState(3);

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

  const handleViewDetails = (id) => {
    if (!user) {
      toast.info("Please login to view food details");
      navigate("/login");
    } else {
      navigate(`/foods/${id}`);
    }
  };

  const changeLayout = () =>{
    setColumns(prev =>(prev === 3 ? 2:3))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={changeLayout}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {columns === 3 ? "View 2 columns" : "View 3 columns"}
      </button>
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
      <div className={`grid gap-6 ${columns === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
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
              <p className="text-sm text-gray-600">
                Quantity: {food.quantity} Plates/Pkts
              </p>
              <p className="text-sm text-gray-600">
                Expire Date: {new Date(food.expiredAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleViewDetails(food._id)}
              className="btn btn-sm mt-4 w-full"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
