import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const products = useLoaderData();
    // console.log(products);


    const [cart, setToCart] = useState([]);
    //finding products form localstorage
    useEffect(() => {
        const savedCart = [];
        const storedCart = getStoredCart()
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                // console.log(quantity);
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
                // console.log(addedProduct);
            }
        }
        setToCart(savedCart);

    }, [products])

    const clearCart = () => {
        setToCart([]);
        deleteShoppingCart();

    }



    const handleAddToCart = (selectedProduct) => {
        console.log(cart);
        let newCart = {};
        const exist = cart.find(product => product.id === selectedProduct.id);
        if (exist) {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            selectedProduct.quantity = selectedProduct.quantity + 1;
            newCart = [...rest, selectedProduct];

        } else {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]
        }
        setToCart(newCart);
        addToDb(selectedProduct.id)
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                        product={product}
                        key={product.id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to="/orders" className='btn-review'>Review Orders</Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;