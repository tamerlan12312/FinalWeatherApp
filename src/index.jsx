import React from 'react';
import ReactDOM from 'react-dom/client';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css" ;
import "bootstrap/dist/js/bootstrap.bundle" ;
import "../src/sass/style.css"
import WeatherApp2 from './components/WeatherApp2';




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <WeatherApp2/>
  </React.StrictMode>
);

