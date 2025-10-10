import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home/Home";

import Movie from "./pages/Movie/Movie";
import Search from "./pages/Search/Search";
import Series from "./pages/Series/Series";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "movie/:id",
        element: <Movie />,
      },
      {
        path: "tv/:id",
        element: <Series />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
