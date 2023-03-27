import React from "react";

const Checkout = () => {

    const checkoutSuccess = () => {
        return (
            <div>
                <h3>Checkout Complete</h3>
                <h2>Thank you for your purchase!</h2>
            </div>
        )
    }

    const checkoutFailure = () => {
        return (
            <div>
                <h3>Checkout Failed</h3>
                <h2>Something went wrong, please try again.</h2>
            </div>
        )
    }

    const checkoutMissing = () => {
        return (
            <div>
                <h3>Checkout Failed</h3>
                <h2>No items in cart, please add products to cart before checking out.</h2>
            </div>
        )
    }

    const exists = localStorage.getItem('cart');
    if (exists === null) {
        return checkoutMissing();
    } else if (exists === '[]') {
        return checkoutMissing();
    } else if (exists !== null) {
        return checkoutSuccess() && localStorage.removeItem('cart');
    } else {
        return checkoutFailure();
    }

}

export default Checkout;