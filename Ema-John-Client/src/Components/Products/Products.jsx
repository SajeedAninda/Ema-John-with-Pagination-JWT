import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Products = () => {
    let [productsData, setProductsData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/products")
            .then(res => setProductsData(res.data));
    }, [])
    console.log(productsData);

    return (
        <div className='w-[90%] mx-auto'>
            <div className='grid grid-cols-3 gap-6  py-16'>
                {
                    productsData.map(product =>
                        <div key={product._id} className='my-4'>
                            <div className='border-2 border-gray-200 h-[520px] rounded-lg flex flex-col justify-between '>
                                <div className='px-4 py-6 space-y-3'>
                                    <div>
                                        <img className='w-full h-[285px] rounded-lg' src={product.img} alt="" />
                                    </div>
                                    <div className='space-y-3'>
                                        <h2 className='text-black text-xl font-bold'>{product.name}</h2>
                                        <h2 className='text-gray-700 text-lg font-bold'>Price: ${product.price}</h2>
                                        <h2 className='text-black text-lg font-bold'>{product.seller}</h2>
                                        <h2>{product.rating}</h2>
                                    </div>
                                </div>
                                <button className='w-full py-3 text-black font-bold text-xl rounded-b-lg bg-[#FFA500] hover:bg-[#ffa60075] '>Add to Cart</button>
                            </div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default Products;