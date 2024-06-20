import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./App.css"
import './styles.css'; // Ensure this import is here


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    //   ./src/serviceWorker.js for development
    // ./serviceWorker.js for Production
    navigator.serviceWorker
      .register("./src/sw.js")
      .then((registration) => {
        console.log("service worker registered as: ", registration.scope);
      })
      .catch((error) => console.error("service worker registration: ", error));
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
