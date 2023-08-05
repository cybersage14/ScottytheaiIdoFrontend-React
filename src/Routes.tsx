import { Navigate, useRoutes } from "react-router";
import LandingLayout from "./layouts/LandingLayout";
import Home from "./pages/Home";

// -------------------------------------------------------------------------------------------

export default function Routes() {
  return useRoutes([
    {
      path: '/',
      element: <LandingLayout />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: '*',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ])
}