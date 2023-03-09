import './App.css';
import styles from './styles/components/home.module.css';
import React, { useState, useEffect } from 'react';

const url = 'https://api.noroff.dev/api/v1/online-shop'

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(url);
      const products = await response.json();
      setProducts(products);
    }
    getProducts();
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Online Shop</h1>
      </header>
      <div className={styles.container}>
        {products.map((product) => {
          const { id, title, price, discountedPrice, description, imageUrl, rating, tags, reviews } = product;
          return (
            <div key={id} className={styles.card}>
              <div className={styles.cardheader}>
                <h2>{title}</h2>
                <img src={imageUrl} alt='{title}' id='product-image' />
              </div>
              <p>{description}</p>
              <p>{price}</p>
              <p>{discountedPrice}</p>
              <div className={styles.tagcontainer}>
                {tags.map((tag) => {
                  return (
                    <p>{tag}</p>
                  )
                })}
              </div>
              <div className={styles.ratingcontainer}>
                {rating.map((rating) => {
                  return (
                    <p>{rating}</p>
                  )
                })}
              </div>
              <div className={styles.reviewcontainer}>
                {reviews.map((review) => {
                  return (
                    <p>{review}</p>
                  )
                })}
              </div>
            </div>
          ) 
        })}
      </div>
    </div>
  );
}

export default App;
