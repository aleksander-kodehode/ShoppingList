import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import LandingPage from "./LandingPage";
import Root from "./routes/Root";
import ShoppingList from "./ShoppingList";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <LandingPage />,
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <LandingPage />,
  },
  {
    //TODO: Going to /app displays only header and footer,
    path: "/app",
    element: <Root />,
    children: [
      {
        path: "/app/user/:userId",
        element: <App />,
      },
      {
        path: "/app/user/:userId/:id",
        element: <ShoppingList />,
      },
    ],
  },
  //TODO: Remove commented code when new apprcoach with nested routes are working.
  // {
  //   path: "/user/:userId/:id",
  //   element: <ShoppingList />,
  // },
  // {
  //   path: "/register",
  //   element: <LandingPage />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
