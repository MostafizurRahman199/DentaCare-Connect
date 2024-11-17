import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/Home/Home";
import ServiceDetails from "../components/Services/ServiceDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";

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
                element: <ServiceDetails />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            }
        ],
    },
  
]);

export default router;