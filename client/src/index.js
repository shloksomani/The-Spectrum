import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import "./copy.css";
import App from "./App";
// import Page from "./components/page";
import "bootstrap/dist/css/bootstrap.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.register();
