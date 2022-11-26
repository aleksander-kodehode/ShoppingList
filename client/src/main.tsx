import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import LandingPage from "./routes/LandingPage";
import Root from "./routes/Root";
import ShoppingList from "./routes/ShoppingList";
import { ConfigProvider } from "antd";
import { antdConfig } from "./configs/andtConfig";
import RegisterPage from "./routes/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <LandingPage />,
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
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
        path: "/app/user/:userId/:listId",
        element: <ShoppingList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={antdConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
