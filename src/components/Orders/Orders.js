import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import OrderItem from '../OrderItem/OrderItem';
// import '../Shop/Shop.css'

const Orders = () => {
    const { products, initialCart } = useLoaderData();
    const [cart, setToCart] = useState(initialCart);
    const handleRemove = id => {
        const remaining = cart.filter(product => product.id !== id);
        setToCart(remaining);
        removeFromDb(id);
    }
    const clearCart = () => {
        setToCart([]);
        deleteShoppingCart();

    }

    return (
        <div className='shop-container'>
            <div className="orders-container">
                {
                    cart.map(product => <OrderItem
                        key={product.id}
                        product={product}
                        handleRemove={handleRemove}
                    />)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} clearCart={clearCart} >
                    <Link to="/shipping" className='btn-review'>Proceed Shiping</Link>
                </Cart>

            </div>

        </div>
    );
};

export default Orders;