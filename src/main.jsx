import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/tokens.css";

function preloadHeroImage() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return new Promise((resolve) => {
    const image = new Image();

    image.decoding = "sync";
    image.fetchPriority = "high";
    image.onload = () => {
      if (typeof image.decode === "function") {
        image.decode().catch(() => {}).finally(resolve);
        return;
      }
      resolve();
    };
    image.onerror = resolve;
    image.src = `${baseUrl}assets/solvay-conference-room.webp`;
  });
}

function BootGate({ children }) {
  const [ready, setReady] = React.useState(() => Boolean(window.__COPENHAGEN_APP_READY__));

  React.useEffect(() => {
    if (ready) return undefined;

    let active = true;
    const fontReady = document.fonts?.ready?.catch(() => {}) ?? Promise.resolve();
    const timeout = new Promise((resolve) => window.setTimeout(resolve, 1200));

    Promise.race([Promise.all([fontReady, preloadHeroImage()]), timeout]).then(() => {
      if (!active) return;
      window.__COPENHAGEN_APP_READY__ = true;
      setReady(true);
    });

    return () => {
      active = false;
    };
  }, [ready]);

  return <div className={`app-shell ${ready ? "app-shell--ready" : ""}`}>{children}</div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BootGate>
      <HashRouter>
        <App />
      </HashRouter>
    </BootGate>
  </React.StrictMode>
);
