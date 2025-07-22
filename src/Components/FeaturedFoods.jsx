import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axiosInstance from "../Api/axiosInstance";

const FeaturedFoods = () => {
  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ["featuredFoods"],
    queryFn: async () => {
      const res = await axiosInstance.get("/foods/featured");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load featured foods</p>;

  return (
    <section className="my-15">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-5xl font-bold">🍱 Featured Foods</h2>
        <Link to="/available-foods">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
            Show All
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food._id} className="bg-white rounded-xl shadow-md p-4">
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="h-40 w-full object-cover rounded-md mb-3"
            />
            <h3 className="text-xl font-semibold">{food.foodName}</h3>
            <p className="text-gray-600">Quantity: {food.quantity}</p>
            <p className="text-sm text-gray-500">Location: {food.pickupLocation}</p>
            <p className="text-sm text-gray-500">Expire: {new Date(food.expiredAt).toLocaleDateString()}</p>
            <Link to={`/foods/${food._id}`}>
              <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedFoods;
