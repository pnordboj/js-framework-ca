import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Checkout.module.css";


const Checkout = ({ setCartAmount }) => {

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

    const checkoutSuccess = () => {
        return (
            <div className={style.checkout}>
                <h1>Checkout complete</h1>
                <h2>Thank you for your purchase</h2>
                <button className={style.returnButton}>
                    <Link to={'/'}>
                        <p>Return to Home page</p>
                    </Link>
                </button>
            </div>
        )
    }

    const checkoutFail = () => {
        return (
            <div className={style.checkout}>
                <h1>Checkout failed</h1>
                <h2>Something went wrong, please try again</h2>
                <button className={style.returnButton}>
                    <Link to={'/'}>
                        <p>Return to Home page</p>
                    </Link>
                </button>
            </div>
        )
    }

    const checkout = () => {
        if (cart.length === 0) {
            return checkoutFail();
        } else {
            localStorage.removeItem('cart');
            setCartAmount(0);
            return checkoutSuccess();
        }
    } 

    return (
        <div className={style.main}>
            {checkout()}
        </div>
    )

}

export default Checkout;