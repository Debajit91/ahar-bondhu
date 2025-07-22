import {
  createBrowserRouter,
} from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import AvailableFoods from "../Pages/AvailableFoods";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "../Routes/PrivateRoute";
import AddFood from "../Pages/AddFood";
import ManageFoods from "../Pages/ManageFoods";
import MyFoodRequest from "../Pages/MyFoodRequest";
import FoodDetails from "../Pages/FoodDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children:[
      {
        path: "/",
        Component: Home
      },
      {
        path: "available-foods",
        Component: AvailableFoods
      },
      {
        path: "foods/:id",
        element: <PrivateRoute>
          <FoodDetails/>
        </PrivateRoute>
      },
      {
        path: "add-food",
        element: (
          <PrivateRoute>
            <AddFood/>
          </PrivateRoute>
        )
      },
      {
        path: "manage-foods",
        element:(
          <PrivateRoute>
            <ManageFoods/>
          </PrivateRoute>
        )
      },
      {
        path: "my-requests",
        element: (
          <PrivateRoute>
            <MyFoodRequest/>
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children:[
      {
        path: "login",
        Component: Login
      },
      {
        path: "signup",
        Component: Register
      }
    ]
  }
]);
