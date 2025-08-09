import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Api/axiosInstance";
import LoaderSpinner from "./LoaderSpinner";


const fetchTopDonators = async () => {
  const res = await axiosInstance.get("/users/top-donators");
  return res.data;
};

const TopDonators = () => {
  const { data: donators = [], isLoading, isError } = useQuery({
    queryKey: ["topDonators"],
    queryFn: fetchTopDonators,
  });

  if (isLoading) return <p className="text-center py-10"><LoaderSpinner/></p>;
  if (isError) return <p className="text-center text-red-500 py-10">Failed to load donators.</p>;

  return (
    <section className="mt-4 mb-10">
      <h2 className="text-3xl font-bold text-center mb-8">Top Donators</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {donators.map((donator, idx) => (
          <div key={idx} className="bg-base-200 p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl text-gray-900 font-semibold">{donator.name}</h3>
            <p className="text-sm text-gray-600">{donator._id}</p>
            <p className="mt-2 text-green-700 font-bold">Contributions: {donator.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDonators;