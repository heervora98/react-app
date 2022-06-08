import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import ProductData from './features/counter/productData'
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Productform from './features/UserLogin/productform'
import CartPage from './features/cart/cartPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/product/:id' element={<ProductData />} />
          <Route path='/Userform' element={<Productform />} />
          <Route path='/product/cart/:id' element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    <ToastContainer />
  </>
  // </React.StrictMode>
);


reportWebVitals();
