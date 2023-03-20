import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import style from "../styles/components/cart.module.css"

const url = "https://api.noroff.dev/api/v1/online-shop";

function Cart() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(url);
      const products = await response.json();
      setProducts(products);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    setCart(cart);
  }, [])

  const removeFromCart = (product) => {
    var arr = [...cart];
    var index = arr.indexOf(product.id);
    arr.splice(index, 1);
    setCart(arr);
    localStorage.setItem("cart", JSON.stringify(arr));
  }

  const cartTotal = () => {
    var total = 0;
    cart.forEach((id) => {
      products.forEach((product) => {
        if (product.id === id) {
          total += product.price;
        }
      });
    });
    return total;
  }

  return (
    <div className={style.main}>
      <div className={style.cart}>
        <h1>Cart</h1>
        <div className={style.cartItems}>
          {cart.map((id) => {
            return (
              products.map((product) => {
                if (product.id === id) {
                  return (
                    <div key={product.id} className={style.cartItem}>
                      <img className={product.cartImage} src={product.imageUrl} alt={product.title} />
                      <div className={style.cartItemInfo}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                      </div>
                      <button className={style.removeButton} onClick={() => removeFromCart(product)}>Remove</button>
                    </div>
                  )
                }
              })
            )
          })}
        </div>
        <div className={style.cartTotal}>
          <h2>Total: ${cartTotal()}</h2>
          <Link to="/checkout">
            <button className={style.checkoutButton}>Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  )

}

export default Cart;