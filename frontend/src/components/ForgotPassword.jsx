import React from 'react'
import {Link} from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <div className='login-container forgo-password-container'>
    <div className='login-content forgot-password-content'>
      <h2>Forgot your password?</h2>
      <p>Reset it to a new one in just 2 steps!</p>
      <input name='new-password' placeholder='New Password' type="password" />
      <input name='confirm-password' placeholder='Confirm Password' type="password" />
      <input name='token' placeholder='Token' type="number" />
      <button style={{marginTop:"20px"}} className='cta-login-btn'><span className='btn-icon'><i className="ri-key-2-line"></i></span><span>Reset Password</span></button>
      <p>Password remembered?<Link to="/login"> Login</Link></p>
    </div>
    </div>
  )
}

export default ForgotPassword
