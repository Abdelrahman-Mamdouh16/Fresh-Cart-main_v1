import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { CartContext } from '../../Context/CartContext';


export default function AddAddressByVisa() {
    let navigate = useNavigate();
    function PayByCash() {
        navigate('/AddAddress')
    };

    function PayByOnline() {
        navigate('AddAddressByVisa')
    };

    let validationSchema = yup.object({
        Address: yup.string().required('Address is required').min(5, 'min length is 5 char'),
        phone: yup.string().required('phone is required').matches(/^(002)?(01[0-25][0-9]{8})$/, 'phone not match'),
        City: yup.string().required('City is required').min(2, 'min length is 2 char'),
    })
    let { CheckOut, payOnline, CartID } = useContext(CartContext);

    async function onlinePayment(value) {
        const { data } = await payOnline(
            CartID,
            "http://localhost:3000",
            value
            );

        if (data?.status === "success") {
            window.location.href = data.session.url;
        }
        CheckOut(CartID,value)
    }

    let Formik = useFormik({
        initialValues: {
            Address: "",
            phone: '',
            City: ''
        },
        validationSchema,
        onSubmit: onlinePayment,
    })



    return (
        <>
            <form className="AddAddressByVisa my-5" onSubmit={Formik.handleSubmit}>
                <div className="container">
                    <h4>Pay your order to get it ready!</h4>
                    <div className='d-flex justify-content-center my-4'>
                        <button className='btn me-4 bg-main text-white' onClick={PayByCash}>Pay By Cash</button>
                        <button className='btn bg-main text-white'>Pay Online</button>
                    </div>
                    <div className="inputs w-75 m-auto">
                        <input type="text" name='Address' id='Address' value={Formik.values.Address} onChange={Formik.handleChange} onBlur={Formik.handleBlur} className='form-control mt-4' placeholder='Enter Address Details' />
                        {Formik.errors.Address && Formik.touched.Address ? <p className='alert alert-danger'>{Formik.errors.Address}</p> : ''}

                        <input type="text" className='form-control mt-4' placeholder='Your Phone' name='phone' id='phone' value={Formik.values.phone} onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
                        {Formik.errors.phone && Formik.touched.phone ? <p className='alert alert-danger'>{Formik.errors.phone}</p> : ''}

                        <input type="text" className='form-control mt-4' placeholder='Address City' name='City' id='City' value={Formik.values.City} onChange={Formik.handleChange} onBlur={Formik.handleBlur} />
                        {Formik.errors.City && Formik.touched.City ? <p className='alert alert-danger'>{Formik.errors.City}</p> : ''}
                    </div>
                    <input type="submit" className='form-control mt-4 w-75 d-block m-auto btn btn-outline-success' value="Pay Online" />
                </div>
            </form>
        </>
    )
}
