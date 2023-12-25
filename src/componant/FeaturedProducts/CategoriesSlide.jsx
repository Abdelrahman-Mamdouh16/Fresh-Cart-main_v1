import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Slider from "react-slick";
import './/../Categories/Categories.css'

export default function CategoriesSlide() {

    const { data, isError, isFetched, isLoading, refetch } = useQuery(['CategoriesSlide'], () => { return axios.get('https://ecommerce.routemisr.com/api/v1/categories') });

    var settings1 = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay:true,
        infinite: true,
    };

    return (
        <div className="CategoriesSlide">
            <div className="container">
                <h2>Shop Popular Categories </h2>
                <Slider {...settings1}>
                    {data?.data.data.map((elem) => { return <img src={elem.image} key={elem._id} className='w-100' height={200} style={{ objectFit: 'cover' }}></img> })}
                </Slider>
            </div>
        </div>
    )
}
