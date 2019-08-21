import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';

let container = document.getElementById('menu_aplicaciones');
let component = <App />;
ReactDOM.render(component, container);