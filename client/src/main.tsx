import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App";
import LandingPage from "./routes/LandingPage";
import Root from "./routes/Root";
import ShoppingList from "./routes/ShoppingList";
import { ConfigProvider } from "antd";
import { antdConfig } from "./configs/andtConfig";
import RegisterPage from "./routes/RegisterPage";
import GlobalStyle from "./globalStyles";
import Trash from "./routes/Trash";
import ErrorPage from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
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
      {
        path: "/app/user/:userId/recover",
        element: <Trash />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={antdConfig}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
);
