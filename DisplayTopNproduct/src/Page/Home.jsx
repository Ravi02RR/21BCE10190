import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { generateUniqueId } from '../utils/productUtils';
import config from '../config/confo';

const Home = () => {
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const companyOptions = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
    const categoryOptions = [
        "Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", 
        "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"
    ];

    const accessToken = config.accessToken;

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const endpoint = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=10&minPrice=${minPrice}&maxPrice=${maxPrice}`;
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            const productsWithIds = data.map(product => ({
                ...product,
                id: generateUniqueId(product)
            }));
            setProducts(productsWithIds);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
           
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <select 
                        value={company} 
                        onChange={(e) => setCompany(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">Select Company</option>
                        {companyOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">Select Category</option>
                        {categoryOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <input 
                        type="number" 
                        placeholder="Min Price" 
                        value={minPrice} 
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <input 
                        type="number" 
                        placeholder="Max Price" 
                        value={maxPrice} 
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <button 
                        type="submit" 
                        className="bg-red-500 text-white py-2 px-4 rounded col-span-2 md:col-span-4"
                    >
                        Search
                    </button>
                </form>
            </div>

            {isLoading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                        <Card product={product} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;