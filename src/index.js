import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faPhone,
  faGamepad,
  faMagnifyingGlass,
  faXmark,
  faDesktop,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { faPlaystation, faXbox, faXTwitter, faFacebookF, faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons";

library.add(
  faHouse,
  faPhone,
  faGamepad,
  faMagnifyingGlass,
  faXmark,
  faPlaystation,
  faXbox,
  faDesktop,
  faChevronLeft,
  faChevronRight,
  faXTwitter,
  faFacebookF,
  faInstagram,
  faDiscord
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
