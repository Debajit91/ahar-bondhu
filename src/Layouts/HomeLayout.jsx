import { Outlet } from "react-router";
import Footer from "../Components/Footer"; 
import Navbar from "../Components/Navbar";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

      
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      
      <Footer />
    </div>
  );
};

export default HomeLayout;
