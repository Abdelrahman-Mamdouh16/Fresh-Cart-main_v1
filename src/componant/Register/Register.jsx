import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function Register() {

  let [error, setError] = useState('')
  let [loading, setLoading] = useState(false);
  let navegat = useNavigate();

  let baseUrl = 'https://ecommerce.routemisr.com';

  async function submitForm(val) {
    
    setLoading(true);

    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signup`, val)
      .catch((err) => {
        setLoading(false)
        setError(err.response.data.message);
        console.log(err)
      })
      
    if (data.message === 'success') {
      setError('')
      setLoading(false)
      navegat('/login')
    }
  }


  const SchemaValidation = yup.object({
    name: yup.string().required('name is required').min(2, 'min length is 2 char').max(20, 'max length is 20 char'),
    email: yup.string().required('email is required').email('email not valid'),
    password: yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,10}$/, 'password not match'),
    rePassword: yup.string().required('rePassword is required').oneOf([yup.ref('password')], 'password not match'),
    phone: yup.string().required('name is required').matches(/^(002)?(01[0-25][0-9]{8})$/, 'phone not match'),
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: SchemaValidation,
    onSubmit: submitForm
  })
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <form action="" className='py-5' onSubmit={formik.handleSubmit}>
        <div className="container">
          {error.length > 0 ? <p className='alert alert-danger'>{error}</p> : ''}
          <h2>Register Now :</h2>

          <label htmlFor="name" className='mt-2'>name :</label>
          <input type="text" name='name' className='form-control' onBlur={formik.handleBlur} id='name' onChange={formik.handleChange} value={formik.values.name} />
          {formik.errors.name && formik.touched.name ? <p className='alert alert-danger'>{formik.errors.name}</p> : ''}

          <label htmlFor="email" className='mt-2'>email :</label>
          <input type="email" name='email' className='form-control' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
          {formik.errors.email && formik.touched.email ? <p className='alert alert-danger'>{formik.errors.email}</p> : ''}


          <label htmlFor="password" className='mt-2'>password :</label>
          <input type="password" name='password' className='form-control' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
          {formik.errors.password && formik.touched.password ? <p className='alert alert-danger'>{formik.errors.password}</p> : ''}


          <label htmlFor="rePassword" className='mt-2'>rePassword :</label>
          <input type="password" name='rePassword' className='form-control' id='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} />
          {formik.errors.rePassword && formik.touched.rePassword ? <p className='alert alert-danger'>{formik.errors.rePassword}</p> : ''}

          <label htmlFor="phone" className='mt-2'>phone :</label>
          <input type="text" name='phone' className='form-control' id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} />
          {formik.errors.phone && formik.touched.phone ? <p className='alert alert-danger'>{formik.errors.phone}</p> : ''}


          <div className='d-flex justify-content-end mt-4'>
            {loading == false ? <button className='btn bg-main text-white' disabled={!(formik.isValid && formik.dirty)} type='submit'>Register</button> : <span className='btn bg-main text-white bg-main'>
              <i className='fa-solid fa-spin fa-spinner'></i>
            </span>}
          </div>

        </div>
      </form>
    </>
  )
}
