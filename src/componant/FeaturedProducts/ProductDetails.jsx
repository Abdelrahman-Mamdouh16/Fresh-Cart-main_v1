import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { UserToken } from '../../Context/UserToken';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const { id } = useParams();

    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            setProductDetails(response.data.data);
        };

        fetchProductDetails();
    }, [id]);

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
            {!productDetails ? <h1 className='text-center my-5'>loading...</h1> : <div className="container my-5">
                <div className="row align-items-center">
                    <div className="col-md-3">
                        <div className="img">
                            <img src={productDetails.imageCover} className='w-100' alt="" />
                        </div>
                    </div>
                    <div className="col-md-9 ">
                        <h3>{productDetails.title}</h3>
                        <p style={{ fontSize: '15px', color: '#78797b' }}>{productDetails.description}</p>
                        <p className='text-main m-0'>{productDetails.category.name}</p>
                        <div className='d-flex justify-content-between' style={{ fontSize: '15px' }}>
                            <h5 className=''>{productDetails.price} EGP</h5>
                            <p className=''> <i className='fa fa-star rating-color me-1 '></i>{productDetails.ratingsAverage}
                            </p>
                        </div>
                        <button className='btn bg-main form-control text-white' onClick={() => { protect(); addToCartFun(productDetails._id) }}>Add to Cart</button>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default ProductDetails;
