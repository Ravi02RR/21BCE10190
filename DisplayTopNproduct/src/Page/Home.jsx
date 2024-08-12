import React, { useEffect, useState } from 'react';
import config from '../config/confo';
import axios from 'axios';
import Card from '../components/Card';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [products, setProducts] = useState([]);
    const accessToken = config.accessToken;
    const endpoint = `http://20.244.56.144/test/companies/${company}/categories/${category}/?top=n&minPrice=${minPrice}&maxPrice=${maxPrice}`;

    const fetchData = async () => {
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [company, category, minPrice, maxPrice]);


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleCompanyChange = (e) => {
        setCompany(e.target.value);
    };

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Search query:', searchQuery);
        fetchData();
    };

    return (
        <div className="bg-black min-h-screen flex items-center justify-center flex-col">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <div className="flex justify-between mt-4">
                        <input
                            type="text"
                            className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Category"
                            value={category}
                            onChange={handleCategoryChange}
                        />
                        <input
                            type="text"
                            className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Company"
                            value={company}
                            onChange={handleCompanyChange}
                        />
                        <input
                            type="number"
                            className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                        />
                        <input
                            type="number"
                            className="w-1/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Display the top N products */}
            <div className="grid grid-cols-3 gap-4 mt-8">
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;
