import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import $ from "jquery";
import logo from '../../Assits/freshcart-logo.svg'
import { UserToken } from './../../Context/UserToken';
import { CartContext } from '../../Context/CartContext';
<reference type={'./../../../@types/jquery'} />

export default function Navbar() {

    useEffect(() => {
        $('#dropdown').on("mouseenter", () => {

            $('#dropdown-toggle').addClass('show').attr('aria-expanded', 'true');
            $('#dropdown-menu').addClass('show').attr('data-bs-popper', 'static');
        }).on("mouseleave", () => {

            $('#dropdown-toggle').removeClass('show').attr('aria-expanded', 'false');
            $('#dropdown-menu').removeClass('show').removeAttr('data-bs-popper', 'static');
        });
    }, []);

    let { isLogin } = useContext(UserToken);
    let { numOfCartItems } = useContext(CartContext)
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container-xl">
                    <Link to={''} className="navbar-brand" href="#">
                        <img src={logo} alt="" />
                    </Link>
                    <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavId">
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            {isLogin !== null ? <>
                                <li className="nav-item">
                                    <Link to={''} className="nav-link" aria-current="page">Home</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={'Products'} className="nav-link">Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'Categories'} className="nav-link">Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'Brands'} className="nav-link">Brands</Link>
                                </li>

                                {/* <li className="nav-item">
                                    <Link to={'Cart'} className="nav-link text-black" style={{ fontSize: '20px' }}><i className="fa-regular fa-heart text-danger"></i>
                                        <span className='power'>{numOfCartItems} </span>
                                    </Link>
                                </li> */}
                            </> : ""}
                        </ul>
                        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

                            {isLogin !== null ? <li className="nav-item">
                                <Link to={'Cart'} className="nav-link me-3"><i className="fa-solid fa-truck-moving fa-flip-horizontal" style={{ color: '#114e6d' }}></i>
                                    <span className='power'>{numOfCartItems}</span></Link>
                            </li> : ''}
                            <li className="nav-item dropdown" id='dropdown'>
                                <Link className="nav-link dropdown-toggle" id='dropdown-toggle' href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-info fs-5"></i>
                                </Link>
                                <ul className="dropdown-menu" id='dropdown-menu'>
                                    <div className="first d-flex justify-content-around">
                                        <li className="nav-item">
                                            <Link className="nav-link" target='_blank' to="https://www.instagram.com/">
                                                <i className="fa-brands fa-instagram fs-5"></i>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">
                                                <i className="fa-brands fa-facebook fs-5"></i>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">
                                                <i className="fa-brands fa-tiktok fs-5"></i>
                                            </Link>
                                        </li>
                                    </div>
                                    <div className="first d-flex justify-content-around">
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">
                                                <i className="fa-brands fa-twitter fs-5"></i>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">
                                                <i className="fa-brands fa-google fs-5"></i>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" href="#">
                                                <i className="fa-brands fa-linkedin fs-5"></i>
                                            </Link>
                                        </li>

                                    </div>
                                </ul>
                            </li>

                            {isLogin == null ? <>
                                <li className="nav-item">
                                    <Link to={'Login'} className="nav-link" href="#">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'Register'} className="nav-link" href="#">Register</Link>
                                </li>
                            </> : <li className="nav-item">
                                <Link to={'SignOut'} className="nav-link" href="#">Sign out</Link>
                            </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav >

        </>
    )
}
