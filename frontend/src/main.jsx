import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./Login.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function Root() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return token ? (
    <App />
  ) : (
    <Login setToken={setToken} />
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);