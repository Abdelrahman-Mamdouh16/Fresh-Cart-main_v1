import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { UserToken } from '../../Context/UserToken'
import { useNavigate } from 'react-router-dom'


export default function SignOut() {
  let myStyle = {
    height: '300px',
    width: 'calc(100% - 50%)',
    margin: '100px auto',
    border: '1px black solid',
    borderRadius: '20px'
  }
  let {setIsLogin}=useContext(UserToken)

  let navigate = useNavigate();
  function out() {
    localStorage.removeItem('UserToken');
    setIsLogin(null);
    navigate('/')
  }
  function In() {
    navigate('/')
  }

  return (
    <>
      <Helmet>
        <title style={{}}>SignOut</title>
      </Helmet>



      <div className='SignOut bg-main' style={myStyle}>
        <div className='text-center' style={{ marginTop: '100px' }} >
          <h4 className='text-center  text-white'>Are you sure to sign out</h4>
          <button className='btn btn-danger me-2'onClick={out}>Yes</button>
          <button className='btn btn-info' onClick={In}>No</button>
        </div>

      </div>
    </>
  )
}
