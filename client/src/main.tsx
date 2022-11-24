import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import LandingPage from "./LandingPage";
import ShoppingList from "./ShoppingList";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <LandingPage />,
    element: <LandingPage />,
  },
  {
    path: "/user/:userId",
    element: <App />,
  },
  {
    path: "/user/:userId/:id",
    element: <ShoppingList />,
  },
  {
    path: "/register",
    element: <LandingPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
