import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import AppLayout from "./AppLayout.jsx";
import AppRoutes from "./AppRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AppRoutes />
    </StrictMode>
  </BrowserRouter>
);
