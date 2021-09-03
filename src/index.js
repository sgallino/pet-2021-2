// Importamos React y React DOM.
import React from 'react';
import ReactDOM from 'react-dom';
// Importamos el Router de React Router.
import {BrowserRouter} from 'react-router-dom';
import './index.css';
// import './tateti/tateti.css';
import App from './App';
// import TatetiApp from "./tateti/TatetiApp.js";
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// BrowserRouter es el componente contenedor de la navegación con React Router.
// Envuelve a todo lo que el Router tenga que manejar. Muy comúnmente, toda la app.
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>,
    // Montamos el proyecto de React en el elemento #root.
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
