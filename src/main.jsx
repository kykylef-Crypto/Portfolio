import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { ThemeProvider } from "./context/ThemeContext";

import { Analytics } from "@vercel/analytics/react";


/*
  Statistiques Vercel : tes propres visites ne sont pas comptées.
  - ouvre le site une fois avec  ?moi=1  à la fin de l'adresse
    → ce navigateur n'est plus compté (à faire sur PC et téléphone)
  - ?moi=0 → ce navigateur est de nouveau compté
*/

try {

  const moi = new URLSearchParams(window.location.search).get("moi");

  if (moi === "1") localStorage.setItem("va-disable", "1");
  if (moi === "0") localStorage.removeItem("va-disable");

} catch {}


const skipMyVisits = (event) => {

  try {
    if (localStorage.getItem("va-disable")) return null;
  } catch {}

  return event;

};


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <HelmetProvider>

      <ThemeProvider>

        <BrowserRouter>

          <App />

          <Analytics beforeSend={skipMyVisits} />

        </BrowserRouter>

      </ThemeProvider>

    </HelmetProvider>

  </React.StrictMode>

);