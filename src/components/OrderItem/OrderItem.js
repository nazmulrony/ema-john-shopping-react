import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './OrderItem.css'

const OrderItem = ({ product, handleRemove }) => {
    const { id, img, name, quantity, price, shipping } = product
    return (
        <div className='order-item-container'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className="item-details-container">
                <div className='item-details'>
                    <p>{name}</p>
                    <p><small>Quantity: {quantity}</small></p>
                    <p><small>Price: ${price}</small></p>
                    <p><small>Shipping Charge: ${shipping}</small></p>
                </div>
                <button onClick={() => handleRemove(id)} className='btn-delete'><FontAwesomeIcon className='delete-icon' icon={faTrashAlt} /></button>
            </div>

        </div>
    );
};

export default OrderItem;