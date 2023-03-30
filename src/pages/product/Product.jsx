import React, { useState, useEffect } from 'react';
import style from './Product.module.css';
import { useParams } from 'react-router-dom';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

function Product({ setCartAmount }) {

    let params = useParams();
    let url = `https://api.noroff.dev/api/v1/online-shop/${params.id}`;

    const [results, setProduct] = useState([]);

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
        
        if (cart.includes(product.id)) {
            return;
        } else {
            const newCart = [...cart, product.id];
            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart);
            setCartAmount(newCart.length);
        }
    }

    useEffect(() => {
        const getProduct = async () => {
            const response = await fetch(url);
            const results = await response.json();
            setProduct(results);
        }
        getProduct();
    }, []);

    const discountCheck = (product) => {
        if (product.discountedPrice === product.price) {
            return (
                <div className={style.price}>
                    <p>Price: {product.price} NOK</p>
                </div>
            )
        } else {
            return (
                <div className={style.price}>
                    <label className={style.normalPrice}>{product.price} NOK</label>
                    <label className={style.discountPrice}>Price: {product.discountedPrice} NOK</label>
                </div>
            )
        }
    }

    const tags = results.tags;
    const splitTags = () => {
        if (tags !== undefined) {
            return tags.join(', ');
        }
    }

    const reviews = results.reviews;
    const mapReviews = () => {
        if (reviews !== undefined) {
            return reviews.map((review) => {
                return (
                    <div key={review.id} className={style.reviewContainer}>
                        <div className={style.review}>
                            <h4>Review by: {review.username}</h4>
                            <div className={style.reviewText}>
                                <p>{review.description}</p>
                            </div>
                        </div>
                        <div className={style.userRating}>
                            <h4>User Rating: </h4>
                            <div className={style.stars}>
                                {review.rating >= 1 ? <BsStarFill /> : review.rating >= 0.5 ? <BsStarHalf /> : <BsStar />}
                                {review.rating >= 2 ? <BsStarFill /> : review.rating >= 1.5 ? <BsStarHalf /> : <BsStar />}
                                {review.rating >= 3 ? <BsStarFill /> : review.rating >= 2.5 ? <BsStarHalf /> : <BsStar />}
                                {review.rating >= 4 ? <BsStarFill /> : review.rating >= 3.5 ? <BsStarHalf /> : <BsStar />}
                                {review.rating >= 5 ? <BsStarFill /> : review.rating >= 4.5 ? <BsStarHalf /> : <BsStar />}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <div className={style.main}>
            <div key={results.id} className={style.product}>
                <div className={style.container}>
                    <div className={style.image}>
                        <img src={results.imageUrl} alt={results.title} />
                    </div>
                    <div className={style.info}>
                        <h1>{results.title}</h1>
                        <p>{results.description}</p>
                        <div className={style.otherInfo}>
                            <div className={style.priceCart}>
                                {discountCheck(results)}
                                <button onClick={() => addToCart(results)} className={style.button}>
                                    Add to cart
                                </button>
                            </div>
                            <div className={style.tagsContainer}>
                                <h4>Tags:</h4>
                                <div className={style.tags}>
                                    <p>{splitTags()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.footer}>
                    {mapReviews()}
                </div>
            </div>
        </div>
    );
}

export default Product;