import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Products = () => {
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:5000/products")
            .then(res => {
                setProductsData(res.data)
                setLoading(false)
            });

    }, []);

    const addToCart = (product) => {
        let { category, name, seller, price, stock, ratings, ratingsCount, img, shipping, quantity } = product;
        let cartData = { category, name, seller, price, stock, ratings, ratingsCount, img, shipping, quantity };
        axios.post("http://localhost:5000/cartData", cartData)
            .then(res => console.log(res.data));
    };

    useEffect(() => {
        axios.get("http://localhost:5000/cartData")
            .then(res => {
                setCart(res.data);
                const totalPrice = res.data.reduce((acc, item) => acc + item.price, 0);
                setTotalPrice(totalPrice);
                setTotalItems(res.data.length);
            });
    }, []);



    return (
        <div className='w-[90%] mx-auto'>
            <div>
                {loading ? (
                    <div className='text-6xl text'>Loading</div>
                ) : (
                    <div className='flex gap-6'>
                        <div className='grid grid-cols-3 gap-6 w-3/4 py-16'>
                            {productsData.map((product) => (
                                <div key={product._id} className='my-4'>
                                    <div className='border-2 border-gray-200 rounded-lg '>
                                        <div className='px-4 py-6 space-y-3'>
                                            <img
                                                className='w-full h-[285px] rounded-lg'
                                                src={product.img}
                                                alt=""
                                            />
                                            <div className='space-y-3 flex flex-col flex-grow'>
                                                <h2 className='text-black text-xl font-bold'>{product.name}</h2>
                                                <h2 className='text-gray-700 text-lg font-bold'>Price: ${product.price}</h2>
                                                <h2 className='text-black text-lg font-bold'>{product.seller}</h2>
                                                <h2>{product.rating}</h2>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className='w-full py-3 text-black font-bold text-xl rounded-b-lg bg-[#FFA500] hover:bg-[#ffa60075] '
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='order-summary bg-red-300 w-1/4 my-16 rounded-lg h-[200px] p-4'>
                            <h2 className='text-2xl font-bold'>Order Summary</h2>
                            <p><span className='font-bold'>Total Items:</span> {totalItems}</p>
                            <p><span className='font-bold'>Total Price:</span> ${totalPrice}</p>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default Products;
