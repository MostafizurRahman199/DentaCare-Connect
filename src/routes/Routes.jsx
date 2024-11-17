import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/Home/Home";
import ServiceDetails from "../components/Services/ServiceDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MyAppointments from "../components/MyAppointments/MyAppointments";
import Profile from "../pages/Profile";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Treatments from "../pages/Treatments";

const router = createBrowserRouter([    
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                    path: "/services/:id",
                element: <PrivateRoute>
                    <ServiceDetails />
                </PrivateRoute>,
            },
            {
                path: "/treatments",
                element: <Treatments />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/my-appointments",
                element: <PrivateRoute>
                    <MyAppointments />
                </PrivateRoute>,
            },
            {
                path: "/profile",
                element: <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            },
        ],
    },
  
]);

export default router;