import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Ensure your CSS includes Tailwind styles
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./utils/store";
import { Toaster } from "@/components/ui/toaster"; // Check this path

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StrictMode>
        <BrowserRouter>
          <App />
          <Toaster /> {/* Correct placement */}
        </BrowserRouter>
      </StrictMode>
    </PersistGate>
  </Provider>
);
