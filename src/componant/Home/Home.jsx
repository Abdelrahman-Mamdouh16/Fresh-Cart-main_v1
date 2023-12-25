import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategoriesSlide from './../FeaturedProducts/CategoriesSlide';
import MainSlider from '../FeaturedProducts/MainSlider';
import { CartContext } from '../../Context/CartContext';


export default function Home() {

  const { GetCart } = useContext(CartContext)
  useEffect(() => {
    GetCart()
  }, [])
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlide />
      <FeaturedProducts />
    </>

  )
}
