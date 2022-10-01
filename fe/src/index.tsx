import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import "antd/dist/antd.min.css";
import { loadLocalization } from "./i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

loadLocalization().then(() => {
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
