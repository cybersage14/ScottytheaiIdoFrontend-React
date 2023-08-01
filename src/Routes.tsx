import { lazy } from "react";
import { Navigate, useRoutes } from "react-router";
import LandingLayout from "./layouts/LandingLayout";

// -------------------------------------------------------------------------------------------

const Home = lazy(() => import('./pages/Home'))

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