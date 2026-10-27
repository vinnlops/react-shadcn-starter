import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router";
import { router } from "./core/router";
import { AppProviders } from "./core/providers/AppProvider";
import "./core/styles";
import { initTheme } from "./core/themes";

const disposeTheme = initTheme();

if (import.meta.hot) {
  import.meta.hot.dispose(disposeTheme);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
