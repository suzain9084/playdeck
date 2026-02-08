import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./lib/store.ts";
import { Provider as ReduxProvider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);
