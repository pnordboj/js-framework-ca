// React Components
import styles from './App.module.css';
import React, { useState, useEffect } from 'react';
import { Route, Link, Routes, Outlet } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { create } from 'zustand';

// Pages
import Home from './pages/home/Home';
import Product from './pages/product/Product';
import Contact from './pages/contact/Contact';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import Missing from './pages/missing/Missing';

export function cartAmount() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) {
    return 0;
  } else {
    return cart.length;
  } 
}

function Nav() {
  

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to='/' className={styles.navitem}>Home</Link>
        </li>
        <li>
          <Link to='/contact' className={styles.navitem}>Contact</Link>
        </li>
      </ul>
      <ul className={styles.cart}>
        <li>
          <div className={styles.cartamount}>
            {cartAmount()}
          </div>
          <Link to='/cart' className={styles.carticon}><IoCartOutline /></Link>
        </li>
      </ul>
    </nav>
  )
}

function Header() {
  return (
    <header className={styles.header}>
      <Nav />
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <p>Footer</p>
    </footer>
  )
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </div>
  );
} 

export default App;