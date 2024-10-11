import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppProviders from "./providers/AppProviders.tsx";
import DialogProvider from "./providers/dialog-provider.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <DialogProvider>
        <App />
      </DialogProvider>
    </AppProviders>
  </StrictMode>,
);
