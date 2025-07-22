import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../Api/axiosInstance";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  console.log("food:", food);

  useEffect(() => {
    const fetchFood = async () => {
      const res = await axiosInstance.get(`/foods/${id}`);
      setFood(res.data);
    };
    fetchFood();
  }, [id]);

  if (!food) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-2xl font-bold mt-4">{food.name}</h2>
      <p>Quantity: {food.quantity}</p>
      <p>Pickup Location: {food.pickupLocation}</p>
      <p>Expires: {new Date(food.expireDate).toLocaleString()}</p>
      <p className="mt-4">{food.notes}</p>
    </div>
  );
};

export default FoodDetails;
