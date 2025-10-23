import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";
import axiosInstance from "../Api/axiosInstance";
import useAuth from "../Hooks/useAuth";

// Fix default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const NearbyFoods = () => {
  const [nearbyFoods, setNearbyFoods] = useState([]);
  const [userLocation, setUserLocation] = useState([23.7806, 90.2794]); // default Dhaka
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation([latitude, longitude]);

        try {
          const res = await axiosInstance.get(
            `/foods/nearby?lat=${latitude}&lng=${longitude}`
          );
          setNearbyFoods(res.data);
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch nearby foods.");
        } finally {
          setLoading(false);
        }
      },
      async (err) => {
        console.error(err);
        toast.warning(
          "Location access denied. Showing default location (Dhaka)."
        );
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p className="text-center mt-4">Loading map...</p>;

  return (
    <div className="h-[500px] w-full max-w-7xl mx-auto mt-20 rounded-lg overflow-hidden shadow">
      <h2 className="text-3xl font-bold text-center mb-8">Nearby Foods</h2>
      <MapContainer
        center={userLocation}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Circle for user location */}
        <Circle
          center={userLocation}
          radius={500} // 500 meters radius
          pathOptions={{ color: "blue", fillOpacity: 0.1 }}
        />

        {/* Food markers */}
        {nearbyFoods.map((food) => (
          <Marker
            key={food._id}
            position={[food.location.lat, food.location.lng]}
          >
            <Popup>
              <div className="text-black">
                <h3 className="font-bold">{food.foodName}</h3>
                <p>Quantity: {food.quantity}</p>
                <p>Donor: {food.donorName}</p>
                {food.notes && <p>Notes: {food.notes}</p>}
                <button
                  className="btn btn-primary mt-2"
                  onClick={async () => {
                    try {
                      await axiosInstance.patch(`/foods/request/${food._id}`, {
                        userEmail: user?.email, // useAuth থেকে লগইন user
                        requestDate: new Date(),
                        notes: food.notes || "",
                      });
                      toast.success("Food requested successfully!");
                      setNearbyFoods((prev) => prev.filter((f) => f._id !== food._id));
                    } catch (err) {
                      console.error(err);
                      toast.error("Failed to request food.");
                    }
                  }}
                >
                  Request Food
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default NearbyFoods;
