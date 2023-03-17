import React, { useState, useEffect } from 'react';
import home from '../styles/components/home.module.css';
import { Link } from 'react-router-dom';
import Product from './product';

const url = 'https://api.noroff.dev/api/v1/online-shop'

function Home() {

    const [cart, setCart] = useState([]);

    const [isShow, setIsShow] = useState(false);

    const showToast = () => {
        setIsShow(true);
        setTimeout(() => {
            setIsShow(false);
        }, 2000);
    }

    const addToCart = (product) => {
        if (cart.includes(product.id)) {
            return;
        }
        var arr = [...cart];
        arr.push(product.id);
        setCart(arr);
        localStorage.setItem('cart', JSON.stringify(arr));
        showToast();
    }

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
        const response = await fetch(url);
        const products = await response.json();
        setProducts(products);
        }
        getProducts();
    }, []);

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
                    <p>Price: ${product.price}</p>
                </div>
            )
        } else {
            return (
                <div className={home.price}>
                    <p className={home.discount}>${product.price}</p>
                    <p>Current Price: ${product.discountedPrice}</p>
                </div>
            )
        }
    }

    const openProduct = (product) => {
        <Link to={`/product/${product.id}`} />
    }

    return (
    <div className={home.main}>
        <div className={home.header}>
            <h1>All Products</h1>
            <div className={home.searchbox}>
                <input
                    className={home.searchbar}
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className={home.container}>
            {results.map((product) => {
                const { id, title, description, imageUrl } = product;
                return (
                        <div key={id} className={home.card}>
                            <img src={imageUrl} alt={title} />
                            <div className={home.cardheader}>
                                <h2>{title}</h2>
                            </div>
                            <p>{description}</p>
                            {discountCheck(product)}
                        
                        <div className={home.cardfooter}>
                            <button onClick={() => addToCart(product)} className={home.cardbutton}>Add to cart</button>
                            <button className={home.cardbutton}>
                                <Link className={home.link} to={`/product/${product.id}`}>
                                    View
                                </Link>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
        {isShow && (
            <div className={home.toast}>
                <p>Added to cart</p>
            </div>        
        )};
    </div>
    );
}

export default Home;