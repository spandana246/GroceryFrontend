import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import Cart from './Pages/Cart';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
