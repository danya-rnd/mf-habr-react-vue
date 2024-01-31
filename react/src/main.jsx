import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/* Регистрируем VueEvents для прослушивания событий
 * и помещаем его в глобальныый объект window
 */
window.vueEventTarget = new EventTarget();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
