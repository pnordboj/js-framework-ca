// React Components
import './App.css';
import styles from './styles/components/app.module.css';
import React, { useState, useEffect } from 'react';
import { Route, Link, Routes, Outlet } from 'react-router-dom';

// Utilities
import { Cartutils } from './utilities/cart/cartUtils';

// Pages
import Home from './pages/home';
import Product from './pages/product';
import Contact from './pages/contact';
import Cart from './pages/cart';

function Nav() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/product'>Product</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
      </ul>
      <ul className={styles.carticon}>
        <li>
          <div className={styles.cartamount}>
            <p>{Cartutils.total}</p>
          </div>
          <Link to='/cart'>Cart</Link>
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
    <footer className={styles.footer}>
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
          </Route>
        </Routes>
      </div>
  );
} 

export default App;