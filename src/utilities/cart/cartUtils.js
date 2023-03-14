import React, { useState, useEffect } from 'react';

export function Cartutils() {

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
}

export default Cartutils;