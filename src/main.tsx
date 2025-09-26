import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import Providers from "./components/Providers.tsx"; // Import Providers
import React from "react"; // Import React for StrictMode

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);