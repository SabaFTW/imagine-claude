import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'leaflet/dist/leaflet.css';

// 🜂 Ustvari korenski element, kjer bo rasel naš organizem
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  {/* 🜂 TUKAJ SE ZAČNE ŽIVI KODEKS! 🜂 */}
  <App />
  </React.StrictMode>,
);
