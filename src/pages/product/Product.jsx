import React, { useState, useEffect } from 'react';
import product from './Product.module.css';
import { useParams } from 'react-router-dom';

function Product() {

    let params = useParams();
    let url = `https://api.noroff.dev/api/v1/online-shop/${params.id}`;

    const [results, setProduct] = useState([]);

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        if (cart.includes(product.id)) {
            return;
        }
        var arr = [...cart];
        arr.push(product.id);
        setCart(arr);
        localStorage.setItem('cart', JSON.stringify(arr));
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
                <div className={product.price}>
                    <p>Price: ${product.price}</p>
                </div>
            )
        } else {
            return (
                <div className={product.price}>
                    <p className={product.discount}>{product.price}</p>
                    <p>Price: ${product.discountedPrice}</p>
                </div>
            )
        }
    }

    return (
        <div className={product.main}>
            <div key={results.id} className={product.product}>
                <div className={product.container}>
                    <div className={product.image}>
                        <img src={results.imageUrl} alt={results.title} />
                    </div>
                    <div className={product.info}>
                        <h1>{results.title}</h1>
                        <p>{results.description}</p>
                        <div className={product.otherinfo}>
                            <div className={product.price}>
                                {discountCheck(results)}
                                <button onClick={() => addToCart(product)} className={product.button}>
                                    Add to cart
                                </button>
                            </div>
                            <div className={product.footer}>        
                                <div className={product.rating}>
                                    <p>Rating: {results.rating}</p>
                                </div>
                                <div className={product.tags}>
                                    <p>Tags: {results.tags}</p>
                                </div>
                                <div className={product.reviews}>

                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;