import React, { useState, useEffect } from 'react';
import home from '../styles/components/home.module.css';
import { Link } from 'react-router-dom';

const url = 'https://api.noroff.dev/api/v1/online-shop'

function Home() {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
        const response = await fetch(url);
        const products = await response.json();
        setProducts(products);
        }
        getProducts();
    }, []);

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const productInCart = cart.find((item) => item.id === product.id);
        if (productInCart) {
            setCart(
                cart.map((item) =>
                    item.id === product.id ? { ...productInCart, qty: productInCart.qty + 1 } : item
                )
            );
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    }

    const removeFromCart = (productToRemove) => {
        setCart(cart.filter((product) => product.id !== productToRemove.id));
    }

    const increment = (product) => {
        const productInCart = cart.find((item) => item.id === product.id);
        setCart(
            cart.map((item) =>
                item.id === product.id ? { ...productInCart, qty: productInCart.qty + 1 } : item
            )
        );
    }

    const decrement = (product) => {
        const productInCart = cart.find((item) => item.id === product.id);
        if (productInCart.qty === 1) {
            removeFromCart(productInCart);
        } else {
            setCart(
                cart.map((item) =>
                    item.id === product.id ? { ...productInCart, qty: productInCart.qty - 1 } : item
                )
            );
        }
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const checkout = () => {
        setCart([]);
    }

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const results = !searchTerm
        ? products
        : products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
        
    const discountCheck = (product) => {
        if (product.discountedPrice === product.price) {
            return (
                <div className={home.price}>
                    <p>{product.price}</p>
                </div>
            )
        } else {
            return (
                <div className={home.price}>
                    <p className={home.discount}>{product.price}</p>
                    <p>{product.discountedPrice}</p>
                </div>
            )
        }
    }

    const openProduct = (product) => {
        <Link to={`/product/${product.id}`} />
    }

    return (
    <div className={home.Home}>
        <h1>Products</h1>
        <div className={home.container}>
            {products.map((product) => {
            const { id, title, description, imageUrl } = product;
            return (
                <div key={id} className={home.card}>
                    <img src={imageUrl} alt={title} className={home.productimage} />
                    <div className={home.cardheader}>
                        <h2>{title}</h2>
                    </div>
                    <p>{description}</p>
                    {discountCheck(product)}
                    <div className={home.cardfooter}>
                        <button className={home.cardbutton}>Add to cart</button>
                        <button onClick={openProduct} className={home.cardbutton}>View</button>
                    </div>
                
                </div>
            ) 
            })}
        </div>
    </div>
    );
}

export default Home;