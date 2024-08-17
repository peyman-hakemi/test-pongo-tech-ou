import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import { MainWrapper } from "./components/layouts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainWrapper>
      <App />
    </MainWrapper>
  </StrictMode>
);
