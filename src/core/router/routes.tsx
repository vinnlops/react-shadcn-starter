import HomePage from "@/pages/Home";
import type { RouteObject } from "react-router-dom";

// ========== EXPORT ROUTES ==============================

export const routes: RouteObject[] = [
  {
    path: "",
    element: <HomePage />,
  },
];
