import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserToken } from './UserToken'
import toast from 'react-hot-toast';

export let CartContext = createContext(null)

export default function CartContextProvider({ children }) {

    let { isLogin } = useContext(UserToken);
    let headers = { token: isLogin };
    let [numOfCartItems, setNumOfCartItems] = useState(0)
    let [CartID, setCartID] = useState(0)
    let [CartVal, setCartVal] = useState(null)
    let [ordersDetails, setOrderDetails] = useState([]);
    let [lastOrder, setLastOrder] = useState(null);

    function addToCart(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, { headers }).then((res) => {
            setNumOfCartItems(res.data.numOfCartItems);
            if (res.data.status === "success") {
                toast.success("Product is added successfully", {
                    duration: 3500,
                });
            } else {
                toast.error("error adding product to cart", {
                    duration: 3500,
                });
            }
            return res;
        }).catch((error) => error);
    }

    function GetCart() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers }).then((res) => {
            setNumOfCartItems(res.data.numOfCartItems)
            return res
        }
        ).catch(err => err);
    }
    function DeleteCart(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers }).then(res => res).catch(err => err);
    }
    function UpdateCart(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers }).then(res => res).catch(err => err);
    }
    function ClearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers }).then(res => res).catch(err => err);
    }
    function CheckOut(id, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, { shippingAddress }, { headers }).then(res => res).catch(err => err);
    }
    function getCheckoutOrders(userId) {
        return axios
            .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
            .then((response) => {
                setOrderDetails(response?.data);
                return response;
            })
            .catch((err) => err);
    }
    useEffect(() => {
        setLastOrder(ordersDetails[ordersDetails.length - 1]);
    }, []);

    function payOnline(CartID, host, shippingAddress) {
        return axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}?url=${host}`,
                { shippingAddress },
                { headers }
            )
            .then((response) => {
                return response;
            })
            .catch((err) => err);
    }

    //!--------- 
    useEffect(() => {
        GetCart()
    }, [CartID])
    return (
        <CartContext.Provider value={{ payOnline, getCheckoutOrders, lastOrder, ordersDetails, addToCart, GetCart, DeleteCart, CheckOut, UpdateCart, ClearCart, numOfCartItems, setNumOfCartItems, CartID, setCartID, CartVal, setCartVal }}>
            {children}
        </CartContext.Provider>
    )
}
