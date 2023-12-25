import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { UserToken } from '../../Context/UserToken';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Cart() {

  let { isLogin } = useContext(UserToken)
  let { GetCart, DeleteCart, UpdateCart, ClearCart, setNumOfCartItems, CheckOut, numOfCartItems,CartID, setCartID } = useContext(CartContext);
  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);

  async function GetCartFun() {
    if (isLogin === null)
      return
    setLoading(true)
    let res = await GetCart();
    setData(await res?.data);
    setLoading(false);
    setCartID(res?.data?.data._id);
    if (res.data) {
      setNumOfCartItems(res?.data?.numOfCartItems)
    } else {
      setNumOfCartItems(0)
    }
  }

  async function DeleteCartFun(id) {
    let res = await DeleteCart(id);
    console.log(res);
    if (res.data.status === 'success') {
      GetCartFun()
      toast.success('product is remove successfully')
    }
  }

  async function UpdateCartFun(id, count) {
    let res = await UpdateCart(id, count);
    console.log(res);
    if (res?.data?.status === 'success') {
      GetCartFun()
      toast.success('product is update successfully')
      if (count <= 0) {
        DeleteCartFun(id)
      }
    }
  }

  async function ClearCartFun() {
    let res = await ClearCart();
    console.log(res);
    if (res?.data?.message === 'success') {
      GetCartFun();
      toast.success('product is clear successfully')
    }
  }

  useEffect(() => {
    GetCartFun();
  }, [isLogin]);
  if (data == null) {
    // <h1 className='text-center my-5'>Cart is empty</h1>
    // setNumOfCartItems(0)
  }


  let Navigate = useNavigate();
  function CheckOutBtn() {
    Navigate('/AddAddress')
  }

  return (<>
    {loading ? <h1 className='text-center my-5'>Loading...</h1> :
      data == null ? <h1 className='text-center my-5'>Cart is empty</h1> :
        <div className="cartBox my-5">
          <div className="container bg-body-secondary py-5 px-4">
            <div className="row">
              <h4>Cart Shop</h4>
              <p>Total Price : {data?.data?.totalCartPrice} EGP</p>
              <div className='d-flex justify-content-between align-items-center'>
                <p className=''>Total number of items : {data?.numOfCartItems}</p>
                <button className='btn btn-secondary py-3 ' onClick={CheckOutBtn}> Check Out</button>
              </div>
              <hr className='mt-3' />
              {data?.data?.products.map((elem) => {
                return <div key={elem._id}>
                  {elem.count > 0 ?
                    <div className="col-md-12" >
                      <div className="row align-items-center ">
                        <div className="col-md-2">
                          <img src={elem.product.imageCover} className='w-100' alt="" />
                        </div>
                        <div className="col-md-10">
                          <p className='m-0 text-main' style={{ fontSize: '13px' }}>{elem.product.title}</p>
                          <div className='d-flex justify-content-between align-items-center'>
                            <p>price : {elem.price}</p>
                            <p>
                              <button className='btn btn-outline-info' onClick={() => { return UpdateCartFun(elem.product._id, elem.count + 1) }}>+</button>
                              <span className='mx-2'>{elem.count}</span>
                              <button className='btn btn-outline-danger' onClick={() => { return UpdateCartFun(elem.product._id, elem.count - 1) }}>-</button>
                            </p>
                          </div>
                          <button className='btn btn-danger' onClick={() => { return DeleteCartFun(elem.product._id) }}>Remove</button>
                        </div>
                      </div>
                      <hr className='mt-3' />
                    </div> : ''}</div>
              })}
            </div>
            <button className='btn btn-danger d-block m-auto' onClick={() => { return ClearCartFun() }}>Clear your Cart</button>
          </div>
        </div>}
  </>
  )
}
