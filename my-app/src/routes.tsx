import { createBrowserRouter } from "react-router-dom";

import NotFoundPage from "./pages/NotfoundPage";
import ErrorPage from "./pages/ErrorPage";
import App from "./App";
import Patients from "./pages/Patients";
import Reception from "./pages/Reception";
import Home from "./pages/home";
import Results from "./pages/Results";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        index: true,
        path: "Reception",
        element: <Reception />,
        errorElement: <ErrorPage />,
      },
      {
        index: true,
        path: "patients",
        element: <Patients />,
        errorElement: <ErrorPage />,
      },
      {
        index: true,
        path: "Results",
        element: <Results />,
        errorElement: <ErrorPage />,
      },
      {
        index: true,
        path: "setting",
        element: <Settings />,
        errorElement: <ErrorPage />,
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
