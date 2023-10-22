import React from 'react';
import { ToastContainer } from 'react-toastify';
import Home from './pages/admin/home/Home';
import Login from './pages/admin/login/Login';
import List from './pages/admin/list/List';
import SinglePage from './pages/admin/single/SinglePage';
import { Switch, Route, Routes } from 'react-router-dom';
import New from './pages/admin/new/New';
import './dark/dark.scss';
import User from './components/user/User';
import Order from './components/order/Order';
import Products from './components/products/Products';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './components/wrapper/AdminRoute';
import { CreateProduct } from './pages/admin/product/CreateProduct';
import ProductsItem from './pages/admin/list/List';
const App = () => {
  return (
    <div className="app ">
      <ToastContainer />

      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<CreateProduct />} />
        <Route path="/users" element={<User />} />
        <Route path="/list" element={<ProductsItem />} />
      </Routes>
    </div>
  );
};

export default App;
