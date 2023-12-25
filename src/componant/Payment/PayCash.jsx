import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { UserToken } from '../../Context/UserToken';
import axios from 'axios';
import { data } from 'jquery';

export default function PayCash() {
    let { getCheckoutOrders, lastOrder } = useContext(CartContext);
    let [isLoading, setLoading] = useState(true);

    let { UserId } = useContext(UserToken)

    async function displayUserOrders(Id) {
        let response = await getCheckoutOrders(Id);
        if (response?.status === 200) {
            setLoading(false);
        }
    }
    useEffect(() => {
        displayUserOrders(UserId);
    }, []);
// console.log(lastOrder);

    return (
        <>
            {
                isLoading ? <h1 className='text-center my-5'>Loading...</h1> :
                    lastOrder ? <>
                        <div className="PayCash my-5 ">
                            <div className='container bg-body-secondary py-5'>

                                <h4 className='fw-bold'>Your Last Order</h4>
                                <h6 className='text-main fw-bold'>Total Price: <span className='text-black'>{lastOrder?.totalOrderPrice}</span></h6>
                                <h6 className='text-main fw-bold'>Payment Method: <span className='text-black'>{lastOrder?.paymentMethodType}</span></h6>
                                {lastOrder?.shippingAddress.phone ?
                                    <p className='text-main fw-bold'>Phone: <span className='text-black'>{lastOrder?.shippingAddress.phone}</span></p> : ''
                                }

                                <div className="row gy-4 mt-4">
                                    {lastOrder?.cartItems?.map((elem, indx) => {
                                        return <div className="col-md-6 " key={indx}>
                                            <div className="row align-items-center">
                                                <div className="col-md-4">
                                                    <img src={elem.product.imageCover} className='w-100' alt="" />
                                                </div>
                                                <div className="col-md-8">
                                                    <p className='m-0 text-main fw-bold' style={{ fontSize: '15px' }}>{elem.product.title.split(' ').splice(0, 2).join(' ')}</p>
                                                    <div className='d-flex justify-content-between align-items-center w-50'>
                                                        <p className='m-0 text-black fw-bold' style={{ fontSize: '15px' }}>Brand: {elem.product.brand.name.split(' ').splice(0, 2).join(' ')}</p>
                                                        <p className='m-0 text-black fw-bold' style={{ fontSize: '15px' }}>Quantity: {elem.count}</p>

                                                    </div>
                                                    <p className='m-0 text-black fw-bold' style={{ fontSize: '15px' }}>Price: {elem.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                    <p className='mt-4 text-black fw-bold text-center'>Thank You</p>
                                </div>
                            </div>
                        </div>
                    </>
                        : ''

            }
        </>


    )
}
