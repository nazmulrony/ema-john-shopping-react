import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    // const { products, count } = useLoaderData();
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const pages = Math.ceil(count / perPage);
    useEffect(() => {
        const url = `http://localhost:5000/products?page=${currentPage}&size=${perPage}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setCount(data.count);
            })
    }, [currentPage, perPage])




    const [cart, setToCart] = useState([]);

    //finding products form localstorage
    useEffect(() => {
        const savedCart = [];
        const storedCart = getStoredCart()
        const ids = Object.keys(storedCart)
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        // console.log(quantity);
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                        // console.log(addedProduct);
                    }
                }
                setToCart(savedCart);

            })


    }, [products])

    const clearCart = () => {
        setToCart([]);
        deleteShoppingCart();

    }



    const handleAddToCart = (selectedProduct) => {
        console.log(cart);
        let newCart = {};
        const exist = cart.find(product => product._id === selectedProduct._id);
        if (exist) {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            selectedProduct.quantity = selectedProduct.quantity + 1;
            newCart = [...rest, selectedProduct];

        } else {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]
        }
        setToCart(newCart);
        addToDb(selectedProduct._id)
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                        product={product}
                        key={product._id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to="/orders" className='btn-review'>Review Orders</Link>
                </Cart>
            </div>

            <div className='pagination'>
                <div>
                    selected page: {currentPage} and page size: {perPage}
                </div>
                {
                    [...Array(pages).keys()].map(number => <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        // className={currentPage === number ? "selected" : undefined}
                        className={`${currentPage === number && 'selected'}`}
                    >{number + 1}</button>)
                }
                <select onChange={event => setPerPage(event.target.value)} defaultValue={perPage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;