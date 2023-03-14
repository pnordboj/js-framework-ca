import React, { useState, useEffect } from 'react';
import product from '../styles/components/product.module.css';
import { useParams } from 'react-router-dom';

function Product() {

    let params = useParams();
    let url = `https://api.noroff.dev/api/v1/online-shop/${params.id}`;

    const [results, setProduct] = useState([]);

    useEffect(() => {
        const getProduct = async () => {
            const response = await fetch(url);
            const results = await response.json();
            setProduct(results);
        }
        getProduct();
    }, []);

    const { reviews } = results;

    let review = reviews.map((review) => {
    });

    console.log(review);



    return (
        <div className={product.main}>
            <div key={results.id} className={product.product}>
                <div className={product.image}>
                    <img src={results.imageUrl} alt={results.title} />
                </div>
                <div className={product.info}>
                    <h1>{results.title}</h1>
                    <p>{results.description}</p>
                    <div className={product.price}>
                        <p>{results.price}</p>
                        <p>{results.discountedPrice}</p>
                    </div>
                </div>
                <div className={product.footer}>
                    <div className={product.rating}>
                        <p>{results.rating}</p>
                    </div>
                    <div className={product.tags}>
                        <p>{results.tags}</p>
                    </div>
                    <div className={product.reviews}>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;