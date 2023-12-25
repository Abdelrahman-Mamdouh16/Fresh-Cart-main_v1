import React from 'react'
import Slider from "react-slick";

export default function MainSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true
    };
    return (
        <>
            <div className="MainSlider my-5">
                <div className="container">
                    <div className="row g-0">
                        <div className="col-md-8">
                            <Slider {...settings}>
                                <img src={require('./../../Assits/images/slider-image-1.jpeg')} className='w-750' height={400} style={{ objectFit: 'cover' }}></img>
                                <img src={require('./../../Assits/images/slider-image-2.jpeg')} className='w-100' height={400} style={{ objectFit: 'cover' }}></img>
                                <img src={require('./../../Assits/images/slider-image-3.jpeg')} className='w-100' height={400} style={{ objectFit: 'cover' }}></img>
                            </Slider>
                        </div>
                        <div className="col-md-4">
                            <img src={require('./../../Assits/images/grocery-banner-2.jpeg')} className='w-100' height={200} style={{ objectFit: 'cover',objectPosition: 'right center' }}></img>
                            <img src={require('./../../Assits/slider-image-1.69e5e73301d9616ba8c6.jpeg')} className='w-100' height={200} style={{ objectFit: 'cover' }}></img>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
