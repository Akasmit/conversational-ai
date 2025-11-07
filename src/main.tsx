import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // tailwind
import "@assistant-ui/styles/index.css";
import "@assistant-ui/styles/markdown.css";
import "./styles/globals.css";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root")!).render(
<React.StrictMode>
<App />
</React.StrictMode>
);