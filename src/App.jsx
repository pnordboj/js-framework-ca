// React Components
import styles from './App.module.css';
import React, { useState, useEffect } from 'react';
import { Route, Link, Routes, Outlet } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';

// Pages
import Home from './pages/home/Home';
import Product from './pages/product/Product';
import Contact from './pages/contact/Contact';
import Cart from './pages/cart/Cart';
import Checkout from './pages/checkout/Checkout';
import Missing from './pages/missing/Missing';

function Nav({ cartAmount }) {

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to='/' className={styles.navitem}>Products</Link>
        </li>
        <li>
          <Link to='/contact' className={styles.navitem}>Contact</Link>
        </li>
      </ul>
      <ul className={styles.cart}>
        <li>
          <div className={styles.cartamount}>
            {cartAmount}
          </div>
          <Link to='/cart' className={styles.carticon}><IoCartOutline /></Link>
        </li>
      </ul>
    </nav>
  )
}

function Header({ cartAmount }) {
  return (
    <header className={styles.header}>
      <Nav cartAmount={cartAmount} />
    </header>
  )
}


function Footer() {
  return (
    <footer>
      <p>&copy; Online Store 2023</p>
    </footer>
  )
}

function Layout({ cartAmount }) {
  return (
    <div>
      <Header cartAmount={cartAmount} />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {

  const [cartAmount , setCartAmount] = useState(0);

  useEffect(() => {
    const getCartAmount = () => {
      const cart = JSON.parse(localStorage.getItem('cart'));
      if (cart !== null) {
        setCartAmount(cart.length);
      } else {
        setCartAmount(0);
      }
    };
    getCartAmount();
  }, []);

  return (
      <div>
        <Routes>
          <Route path="/" element={<Layout cartAmount={cartAmount} />}>
            <Route index element={<Home setCartAmount={setCartAmount} />} />
            <Route path="product/:id" element={<Product setCartAmount={setCartAmount} />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart setCartAmount={setCartAmount} />} />
            <Route path="checkout" element={<Checkout setCartAmount={setCartAmount} />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </div>
  );
} 

export default App;