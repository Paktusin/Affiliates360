import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import "antd/dist/antd.min.css";
import { loadLocalization } from "./i18n";
import axios from "axios";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

axios.defaults.headers.common = { Accept: "application/json", ...axios.defaults.headers.common };

loadLocalization().then(() => {
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
