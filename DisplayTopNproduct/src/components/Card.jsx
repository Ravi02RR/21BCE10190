import React from 'react';
import { getRandomImage } from '../utils/productUtils.js';

const Card = ({ product }) => {
    const { name, company, category, price, rating, discount, availability } = product;
    const imageUrl = getRandomImage();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
            <div className="p-4">
                <h3 className="font-bold text-xl mb-2">{name}</h3>
                <p>Company: {company}</p>
                <p>Category: {category}</p>
                <p>Price: ${price}</p>
                <p>Rating: {rating}/5</p>
                <p>Discount: {discount}%</p>
                <p>Availability: {availability ? 'In Stock' : 'Out of Stock'}</p>
            </div>
        </div>
    );
};

export default Card;