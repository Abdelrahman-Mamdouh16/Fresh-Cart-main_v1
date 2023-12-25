import React, { useContext, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayOut from './componant/LayOut/LayOut'
import Home from './componant/Home/Home';
import Products from './componant/Products/Products';
import Categories from './componant/Categories/Categories';
import Brands from './componant/Brands/Brands';
import NotFound from './componant/NotFound/NotFound';
import Login from './componant/Login/Login';
import Register from './componant/Register/Register';
import SignOut from './componant/SignOut/SignOut';
import Cart from './componant/Cart/Cart';
import { UserToken } from './Context/UserToken';
import Protect from './Context/Protect';
import ProductDetails from './componant/FeaturedProducts/ProductDetails';
import { Toaster } from 'react-hot-toast';
import AddAddress from './componant/Payment/AddAddress';
import AddAddressByCash from './componant/Payment/AddAddressByCash';
import AddAddressByVisa from './componant/Payment/AddAddressByVisa';
import PayCash from './componant/Payment/PayCash';
import Allorders from './componant/Cart/Allorders';
import FeaturedProducts from './componant/FeaturedProducts/FeaturedProducts';



export default function App() {

  let { setIsLogin } = useContext(UserToken);

  useEffect(() => {

    if (localStorage.getItem('UserToken') != null) {
      setIsLogin(localStorage.getItem('UserToken'));
    }
  }, [])




  let router = createBrowserRouter([{
    path: '', element: <LayOut />, children: [
      { index: true, element: <Home /> },
      { path: 'Cart', element: <Protect><Cart /></Protect> },
      {
        path: 'Products', element: <Protect><Products /></Protect>, children: [
          { index: true, element: <FeaturedProducts /> },
          { path: 'ProductDetails/:id', element: <ProductDetails /> },
        ]
      },
      { path: 'ProductDetails/:id', element: <ProductDetails /> },
      { path: 'Categories', element: <Protect><Categories /></Protect> },
      { path: 'Brands', element: <Protect><Brands /></Protect> },
      { path: 'Login', element: <Login /> },
      { path: 'allorders', element: <Protect><Allorders /></Protect> },
      { path: 'Register', element: <Register /> },
      { path: 'SignOut', element: <Protect> <SignOut /></Protect> },
      {
        path: 'AddAddress', element: <Protect> <AddAddress /></Protect>, children: [
          {
            index: true, element: <Protect> <AddAddressByCash></AddAddressByCash></Protect>
          },
          { path: 'PayCash', element: <Protect><PayCash /> </Protect> },
          { path: 'AddAddressByVisa', element: <Protect> <AddAddressByVisa></AddAddressByVisa></Protect> }
        ]
      },
      { path: '*', element: <NotFound /> },
    ]
  }])

  return (

    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}
