import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Protect from '../../Context/Protect';
import { Navigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { UserToken } from '../../Context/UserToken';

export default function FeaturedProducts() {

    const { data, isError, isFetched, isLoading, refetch } = useQuery(['product'], () => { return axios.get('https://ecommerce.routemisr.com/api/v1/products')});
    let finalData
    if (data !== undefined) {
        finalData = data.data.data
    }
    let Navigate = useNavigate()

    function protect() {
        if (!localStorage.getItem('UserToken')) {
            Navigate('/Login')
        }
    }
    let { addToCart ,setNumOfCartItems } = useContext(CartContext);
    let { isLogin } = useContext(UserToken);

    async function addToCartFun(id) {
        let res = await addToCart(id);

        {
            !isLogin ? toast.error(res.response.data.message)
                : toast.success(res.data.message);
        }
        if(res) setNumOfCartItems(res?.data?.numOfCartItems)
    }

    return (
        <>
            <div className="container my-5">
                <h1>Featured Products</h1>
                <div className="row gy-2 ">
                    {isLoading ? <h1 className='text-center my-2'>loading...</h1> : finalData?.map((element) =>
                        <div className="col-lg-2 col-md-4" key={element._id}>
                            <div className="product">
                                <Link to={`ProductDetails/${element._id}`} onClick={refetch}>
                                    <img src={element.imageCover} className='w-100' alt="" />
                                    <p className='text-main mt-2 ms-2 cursor-pointer' style={{ fontSize: '12px', margin: '0' }}>{element.category.name}</p>
                                    <p className='ms-2 cursor-pointer'>{element.title.split(' ').slice(0, 2).join(' ')}</p>
                                    <div className='d-flex justify-content-between' style={{ fontSize: '15px' }}>
                                        <p className='ms-2'>{element.price} EGP</p>
                                        <p className='me-2'> <i className='fa fa-star rating-color me-1 '></i>{element.ratingsAverage}
                                        </p>
                                    </div>
                                </Link>
                                <button className='btn bg-main ms-2 mb-2 text-white' onClick={() => { protect(); addToCartFun(element._id) }}>Add to Cart</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}
