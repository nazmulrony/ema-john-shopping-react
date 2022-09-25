import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Product.css'

const Product = (props) => {
    const { img, price, ratings, seller, name } = props.product;
    return (
        <div className='product'>
            <div className="image-container">
                <img src={img} alt="" />
            </div>
            <div className="product-info">
                <h3>{name}</h3>
                <p>Price: ${price}</p>
                <p><small>Manufacturer: {seller}</small></p>
                <p><small>Ratings: {ratings}</small></p>
            </div>
            <button onClick={() => { props.handleAddToCart(props.product) }} className='btn-cart'>
                <p>Add to cart</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;