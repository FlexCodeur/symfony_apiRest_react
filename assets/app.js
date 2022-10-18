/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// Import react project
import './react/App.js';
import React from 'react';
import App from './react/App.js'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
