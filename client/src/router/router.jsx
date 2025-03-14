import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Signup from "../pages/Signup";
import Rooms from "../pages/Rooms";
import RoomDetails from "../pages/RoomDetails";
import MyBooking from "../pages/My Booking/MyBooking";
import Page404 from "../pages/Error/Page404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () =>
          fetch(
            "http://localhost:5000/rooms?limit=6"
            // `https://b10a11-server-side-mdtayef001.vercel.app/rooms?limit=6`
          ),
      },
      {
        path: "/rooms",
        element: <Rooms />,
        loader: () =>
          fetch(
            "http://localhost:5000/rooms"
            // `https://b10a11-server-side-mdtayef001.vercel.app/rooms`
          ),
      },
      {
        path: "rooms/details/:id",
        element: <RoomDetails />,
        loader: ({ params }) =>
          fetch(
            `https://b10a11-server-side-mdtayef001.vercel.app/rooms?id=${params.id}`
            // `http://localhost:5000/rooms?id=${params.id}`
          ),
      },
      {
        path: "/myBooking",
        element: (
          <PrivateRoute>
            <MyBooking />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth",
        element: <Navigate to={"/auth/login"} />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default router;
