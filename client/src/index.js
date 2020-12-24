import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import TimeAgo from "javascript-time-ago";

import en from 'javascript-time-ago/locale/en';
import EventEmitter from 'events';
export default new EventEmitter();

TimeAgo.addDefaultLocale(en);

ReactDOM.render(<App />, document.getElementById("root"));
