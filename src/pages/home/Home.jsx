import React, { useState, useEffect } from 'react';
import style from './Home.module.css';
import { Link } from 'react-router-dom';

const url = 'https://api.noroff.dev/api/v1/online-shop'

const Home = ({ setCartAmount }) => {

    const [isShow, setIsShow] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);

    const showAdded = () => {
        setAlreadyAdded(true);
        setTimeout(() => {
            setAlreadyAdded(false);
        }, 2000);
    }

    const showToast = () => {
        setIsShow(true);
        setTimeout(() => {
            setIsShow(false);
        }, 2000);
    }

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const getCart = async () => {
            const cart = JSON.parse(localStorage.getItem('cart'));
            if (cart !== null) {
                setCart(cart);
                setCartAmount(cart.length);
            }
        }
        getCart();
    }, [setCartAmount]);

    const addToCart = (product) => {
        const exist = cart.find((x) => x === product.id);
        if (exist) {
            showAdded();
            return;
        } else {
            const newCart = [...cart, product.id];
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart);
            setCartAmount(newCart.length);
            showToast();
        }
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
                <div className={style.price}>
                    <p>{product.price} NOK</p>
                </div>
            )
        } else {
            return (
                <div className={style.price}>
                    <label className={style.normalPrice}>{product.price} NOK</label>
                    <label className={style.discountPrice}>{product.discountedPrice} NOK</label>
                </div>
            )
        }
    }

    const discountPercentage = (product) => {
        const discount = (product.price - product.discountedPrice) / product.price * 100;
        if (discount === 0) {
            return;
        } else {
            const percent = Math.round(discount);
            return (
                <div className={style.discountWrap}>
                    <p>Sale {percent}% off</p>
                </div>
            )
        }
    }

    return (
    <div className={style.main}>
        <div className={style.header}>
            <h1>All Products</h1>
            <div className={style.searchBox}>
                <input
                    className={style.searchBar}
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className={style.container}>
            {results.map((product) => {
                const { id, title, imageUrl } = product;
                return (
                    <div key={id} className={style.card}>
                        <Link to={`/product/${product.id}`} className={style.cardHeader}>
                            {discountPercentage(product)}
                            <img src={imageUrl} alt={title} />
                            <div className={style.cardTitle}>
                                <h2>{title}</h2>
                            </div>
                            {discountCheck(product)}
                        </Link>
                        <div className={style.cardFooter}>
                            <button onClick={() => addToCart(product)} className={style.cardButton}>Add to cart</button>
                            <button className={style.cardButton}>
                                <Link className={style.link} to={`/product/${product.id}`}>
                                    View
                                </Link>
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
        {isShow && (
            <div className={style.toast}>
                <p>Added to cart</p>
            </div>        
        )};
        {alreadyAdded && (
            <div className={style.toast}>
                <p>Already added to cart</p>
            </div>
        )};
    </div>
    );
}

export default Home;