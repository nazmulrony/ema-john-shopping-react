import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const { cart, clearCart, children } = props
    let total = 0;
    let shippingFee = 0;
    let quantity = 0
    // console.log(cart);
    for (const product of cart) {
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shippingFee = shippingFee + product.shipping

    }
    let tax = Math.trunc(total * .1)
    let grandTotal = total + shippingFee + tax;



    return (
        <div className='cart'>
            <h2>Order Summery</h2>
            <p>Selected Products: {quantity}</p>
            <p>Total Price: {total}</p>
            <p>Total Shipping Fee: {shippingFee}</p>
            <p>Total Tax: {tax}</p>
            <h4>Grand Total: {grandTotal} </h4>
            <button onClick={clearCart} className='btn-clear'>Clear Cart</button>
            {children}

        </div>
    );
};

export default Cart;