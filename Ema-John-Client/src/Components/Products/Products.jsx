import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Products = () => {
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    // PAGINATION STATES 
    const [currentPages, setCurrentPages] = useState(0);
    const [count, setCount] = useState(0);
    const [itemPerPage, setitemPerPage] = useState(5)


    // TO LOAD ALL DATA 
    // useEffect(() => {
    //     setLoading(true);
    //     axios.get("http://localhost:5000/products")
    //         .then(res => {
    //             setProductsData(res.data)
    //             setLoading(false)
    //         });

    // }, []);

    // TO LOAD SELECTED DATA WITH PAGINATION 
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/products?page=${currentPages}&size=${itemPerPage}`)
            .then(res => res.json())
            .then(data => setProductsData(data))
            setLoading(false)
    }, [currentPages, itemPerPage]);

    const addToCart = (product) => {
        let { category, name, seller, price, stock, ratings, ratingsCount, img, shipping, quantity } = product;
        let cartData = { category, name, seller, price, stock, ratings, ratingsCount, img, shipping, quantity };
        axios.post("http://localhost:5000/cartData", cartData)
            .then(res => {
                // console.log(res.data)
            });
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

    let handleClear = () => {
        axios
            .delete('http://localhost:5000/cartData')
            .then((res) => {
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    setCart([]);
                    setTotalItems(0);
                    setTotalPrice(0);
                }
            })
    }

    // PAGINATION 
    useEffect(() => {
        axios.get("http://localhost:5000/productCount")
            .then(res => setCount(res.data.count));
    }, [])
    // console.log(count);

    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const handleSelectBtn = e => {
        const value = parseInt(e.target.value);
        setitemPerPage(value);
        setCurrentPages(0)
    }

    const handlePrevBtn = () => {
        if (currentPages > 0) {
            setCurrentPages(currentPages - 1)
        }
    }

    const handleNextBtn = () => {
        if (currentPages < pages.length - 1) {
            setCurrentPages(currentPages + 1)
        }
    }



    return (
        <div className='w-[90%] mx-auto'>
            <div>
                {loading ? (
                    <div className='text-6xl text'>Loading</div>
                ) : (
                    <div className='flex gap-6'>
                        <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 w-3/4 py-16'>
                            {productsData.map((product) => (
                                <div key={product._id} className='my-4'>
                                    <div className='border-2 border-gray-200 rounded-lg '>
                                        <div className='px-4 py-6 space-y-3'>
                                            <img
                                                className='w-full h-[285px] rounded-lg'
                                                src={product?.img}
                                                alt=""
                                            />
                                            <div className='space-y-3 flex flex-col flex-grow'>
                                                <h2 className='text-black text-xl font-bold'>{product?.name}</h2>
                                                <h2 className='text-gray-700 text-lg font-bold'>Price: ${product?.price}</h2>
                                                <h2 className='text-black text-lg font-bold'>{product?.seller}</h2>
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

                        <div className='order-summary bg-red-300 w-1/4 my-16 rounded-lg h-fit p-4'>
                            <h2 className='text-2xl font-bold'>Order Summary</h2>
                            <p><span className='font-bold'>Total Items:</span> {totalItems}</p>
                            <p><span className='font-bold'>Total Price:</span> ${totalPrice}</p>
                            <button className='w-full py-3 bg-red-500 text-white rounded-lg font-bold mt-3' onClick={handleClear}>Clear Cart</button>
                        </div>
                    </div>
                )}
            </div>

            <div className='flex justify-center gap-8'>
                <div className='flex gap-4'>
                    <button onClick={handlePrevBtn}>Prev</button>
                    {
                        pages.map(page => <button onClick={() => setCurrentPages(page)} className={page === currentPages ? 'text-red-600 text-xl font-bold' : 'text-xl font-bold'} key={page}>{page}</button>)
                    }
                    <button onClick={handleNextBtn}>Next</button>
                </div>

                <div>
                    <select onChange={handleSelectBtn} value={itemPerPage}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Products;
