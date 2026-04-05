import React from 'react';
//import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom/client'
import './index.css';
import App from './App';

// react-router-dom 6
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter> 
);

