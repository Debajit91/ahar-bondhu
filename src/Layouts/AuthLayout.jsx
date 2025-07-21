import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";


const AuthLayout = () => {
  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      
    </div>
  );
};

export default AuthLayout;
