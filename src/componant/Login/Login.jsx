import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { UserToken } from '../../Context/UserToken'

export default function Login() {

  let [error, setError] = useState('')
  let [loading, setLoading] = useState(false);
  let navegat = useNavigate();
  let { setIsLogin } = useContext(UserToken)


  let baseUrl = 'https://ecommerce.routemisr.com';
  async function submitForm(val) {
    setLoading(true);
    let { data } = await axios.post(`${baseUrl}/api/v1/auth/signin`, val)
      .catch((err) => {
        setLoading(false)
        setError(err.response.data.message);
        // console.log('hi')
      })
    if (data.message === 'success') {
      setError('');
      setLoading(false);
      localStorage.setItem('UserToken', data.token)
      setIsLogin(data.token)
      navegat('/')
    }
  }


  const SchemaValidation = yup.object({
    email: yup.string().required('email is required').email('email not valid'),
    // password: yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,10}$/, 'password not match'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SchemaValidation,
    onSubmit: submitForm
  })

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form action="" className='py-5' onSubmit={formik.handleSubmit}>
        <div className="container">

          {error.length > 0 ? <p className='alert alert-danger'>{error}</p> : ''}
          <h2>Login Now :</h2>

          <label htmlFor="email" className='mt-2'>email :</label>
          <input type="email" name='email' className='form-control' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
          {formik.errors.email && formik.touched.email ? <p className='alert alert-danger'>{formik.errors.email}</p> : ''}


          <label htmlFor="password" className='mt-2'>password :</label>
          <input type="password" name='password' className='form-control' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
          {formik.errors.password && formik.touched.password ? <p className='alert alert-danger'>{formik.errors.password}</p> : ''}


          <div className='d-flex justify-content-end mt-4'>
            {loading == false ? <button className='btn bg-main text-white' disabled={!(formik.isValid && formik.dirty)} type='submit'>Login</button> : <span className='btn bg-main text-white bg-main'>
              <i className='fa-solid fa-spin fa-spinner'></i>
            </span>}
          </div>

        </div>
      </form>
    </>
  )
}
