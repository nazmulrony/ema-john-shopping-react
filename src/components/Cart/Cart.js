import React from 'react';
import './Cart.css'

const Cart = ({ cart }) => {
    return (
        <div>
            <h2>Order Summery</h2>
            <h3>Total products: {cart.length}</h3>
        </div>
    );
};

export default Cart;