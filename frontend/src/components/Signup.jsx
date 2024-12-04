import React, { useState } from 'react'
import { Link} from 'react-router-dom';

const Signup = () => {
  const[signupData , setSignupData] = useState({
    fullname : "",
    email : "",
    password : "",
    role : "",
  })
  const handleChange=(e)=>{
    const {name , value} = e.target;
    setSignupData((prevData)=>({...prevData , [name] : value}))
  }
  const handleSignup=()=>{
    console.log(signupData)
  }
  return (
    <div className='signup-container'>
        <div className='signup-content'>
          <h2>Regsiter a new account</h2>
          <p>Start buying and selling in just a few steps</p>
          <input onChange={handleChange}  name='fullname' placeholder='Fullname' type="text" />
          <input onChange={handleChange}  name='email' placeholder='Email' type="text" />
          <input onChange={handleChange} name='password' placeholder='Password' type="password" />
          <select onChange={handleChange} name='role'>
            <option selected disabled value="">Choose role</option>
            <option value="seller">Be a seller</option>
            <option value="buyer">Be a buyer</option>
          </select>
          <div className="validation-box">

          </div>
          <p style={{fontSize:"13px",margin:"15px 10px 15px 0",color:"black",textAlign:"left"}}>By submiting the details, you accept the <Link to="/terms-of-use">Terms of Use</Link></p>
          <button onClick={handleSignup} className='cta-signup-btn'><span className='btn-icon'><i className="ri-add-circle-line"></i></span><span>Signup</span></button>
          <p>Have an account?<Link to="/login"> Log in</Link></p>
        </div>
        </div>
  )
}

export default Signup
