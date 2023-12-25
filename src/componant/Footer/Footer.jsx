import React from 'react'
import './Footer.css'


export default function Footer() {
    return (
        <>
            <div className="footer py-5" style={{ backgroundColor: '#f0f3f2' }}>
                <div className='container'>
                    <div className="row">
                        <div className="col-md-12" >
                            <h3>Get the FreshCart app</h3>
                            <p>We will send you a link, open it on your phone to download the app.</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10">
                            <input type="text" className="form-control" name="" id="" aria-describedby="helpId" placeholder="Email" />
                        </div>
                        <div className="col-xl-2 mt-3 mt-xl-0">
                            <button className='btn form-control bg-main text-white' type='submit'>Share App Link</button>
                        </div>
                    </div>
                    <hr />
                    <div className="lowerContinent">
                        <div className="row">
                            <div className="col-lg-5 start">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div>
                                            <h5 className='mt-2'>Payment Partners</h5>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="img">
                                            <img src={require('../../Assits/Amazon_Pay-Logo.wine_.png')} className=''  alt="" />
                                            <img src={require('../../Assits/196539.png')} className='' alt="" />
                                            <img src={require('../../Assits/MasterCard_early_1990s_logo.svg.png')} className='' alt="" />
                                            <img src={require('../../Assits/Paypal.png')} className='' alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 end  mt-3 mt-md-0">
                                <div className="row ">
                                    <div className="col-lg-12 col-xl-7 d-flex justify-content-md-start justify-content-lg-end">
                                        <div>
                                            <h5 className='mt-2 text-xl-end'>Get deliveries with FreshCart</h5>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-xl-5 d-flex justify-content-md-start justify-content-lg-end ">
                                        <div className="imgLow mt-2">
                                            <img src={require('../../Assits/apple-app-store-travel-awards-globestamp-7.png')} width={' 100px'} alt="" />
                                            <img src={require('../../Assits/apple-app-store-travel-awards-globestamp-7 (1).png')} width={' 100px'} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    )
}
