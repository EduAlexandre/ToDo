import React from 'react';
import ReactDOM from 'react-dom';

 import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './router'

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer autoClose={8000} />
    <Routes />  
  </React.StrictMode>,
  document.getElementById('root')
);


