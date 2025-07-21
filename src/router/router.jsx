import {
  createBrowserRouter,
} from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import AvailableFoods from "../Pages/AvailableFoods";


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
      }
    ]
  },
  {
    path: "/"
  }
]);
