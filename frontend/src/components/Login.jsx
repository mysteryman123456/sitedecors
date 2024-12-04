import React, { useState }  from 'react';
import { Link} from 'react-router-dom';

const Login = () => {
  const[loginData , setLoginData] = useState({
    email : "",
    password : "",
  });

  const handleChange=(event)=>{
    const{name , value} = event.target;
    setLoginData((prevData)=>({...prevData , [name] : value}))
  }
  const handleLogin=()=>{
    console.log(loginData)
  }
  return (
    <div className='login-container'>
    <div className='login-content'>
      <div className="login-icon">
      <svg width="102px" height="102px" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.648"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6Z" fill="#b8b8b8"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 14.0289 19.2447 15.8813 18.0001 17.2916C16.4085 15.8674 14.3052 15 12.0002 15C9.69511 15 7.5917 15.8675 6.00015 17.2918C4.75533 15.8815 4 14.029 4 12Z" fill="#b8b8b8"></path> </g></svg>
      </div>
      <h2>Log in to your account</h2>
      <p>We're happy to see you again!</p>
      <input onChange={handleChange} name='email' placeholder='Email' type="text" />
      <input onChange={handleChange} name='password' placeholder='Password' type="password" />
      <div className="forgot-password-layer"><Link to="/forgot-password">Forgot your password?</Link></div>
      <button onClick={handleLogin} className='cta-login-btn another_class added'><span className='btn-icon'><i className="ri-lock-star-line"></i></span><span>Log in</span></button>
    </div>
    </div>
  )
}

export default Login
