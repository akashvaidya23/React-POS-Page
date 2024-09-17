import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import './index.css'
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import POS from "./Components/POS/POS.jsx";
import Product_List from "./Components/Product_List/Product_List.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <POS />,
  },
  {
    path: "/products",
    element: <Product_List />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
