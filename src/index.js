// Importamos React y React DOM.
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import './tateti/tateti.css';
import App from './App';
// import TatetiApp from "./tateti/TatetiApp.js";
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
    // Montamos el proyecto de React en el elemento #root.
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
