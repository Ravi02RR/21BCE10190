import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRandomImage } from '../utils/productUtils';
import config from '../config/confo';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);
            try {
                
                const response = await fetch(`http://20.244.56.144/test/product/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${config.accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>Product not found</div>;

    const { name, company, category, price, rating, discount, availability } = product;
    const imageUrl = getRandomImage();

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto">
                <img className="w-full h-64 object-cover" src={imageUrl} alt={name} />
                <div className="p-8">
                    <h1 className="font-bold text-3xl mb-4">{name}</h1>
                    <p className="text-xl mb-2">Company: {company}</p>
                    <p className="text-xl mb-2">Category: {category}</p>
                    <p className="text-xl mb-2">Price: ${price}</p>
                    <p className="text-xl mb-2">Rating: {rating}/5</p>
                    <p className="text-xl mb-2">Discount: {discount}%</p>
                    <p className="text-xl mb-2">Availability: {availability ? 'In Stock' : 'Out of Stock'}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;