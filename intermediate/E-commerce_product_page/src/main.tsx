import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./sass/main.scss";
import { CartContext } from "./contexts/CartContext.tsx";
import MobileNavContext from "./contexts/MobileNavContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartContext>
      <MobileNavContext>
        <App />
      </MobileNavContext>
    </CartContext>
  </React.StrictMode>
);
