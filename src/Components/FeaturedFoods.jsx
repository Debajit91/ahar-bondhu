import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axiosInstance from "../Api/axiosInstance";
import { motion } from "framer-motion";

const FeaturedFoods = () => {
  const {
    data: foods = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featuredFoods"],
    queryFn: async () => {
      const res = await axiosInstance.get("/foods/featured");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">Failed to load featured foods</p>
    );

  return (
    <section className="my-15">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Featured Foods</h2>
        <Link to="/available-foods">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer"> 
            Show All
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((food, index) => (
          <motion.div
            key={food._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.5 }}
            className="p-4 bg-base-200 shadow rounded"
          >
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="h-40 w-full object-cover rounded-md mb-3"
            />
            <h3 className="text-xl font-semibold">{food.foodName}</h3>
            <p className="text-gray-600">Quantity: {food.quantity} Plates / Kgs</p>
            <p className="text-sm text-gray-500">
              Location: {food.pickupLocation}
            </p>
            <p className="text-sm text-gray-500">
              Expire: {new Date(food.expiredAt).toLocaleDateString()}
            </p>
            <Link to={`/foods/${food._id}`}>
              <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md">
                View Details
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedFoods;
