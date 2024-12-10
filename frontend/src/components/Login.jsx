import React, { useState }  from 'react';
import { Link , useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const[loginData , setLoginData] = useState({
    email : "",
    password : "",
  });

  const handleChange=(event)=>{
    const{name , value} = event.target;
    setLoginData((prevData)=>({...prevData , [name] : value}))
  }
  const handleLogin= async()=>{
    try{
      const response = await fetch("http://localhost:3008/login",{
        method : "POST",
        body : JSON.stringify(loginData),
        headers : {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      if(response.ok && response.status === 200){
        window.success(data.message)
        navigate("../");
      }else{
        window.failure(data.message)
      }
    }catch(err){
      console.log(err);
    } 
  }
  return (
    <div className='login-container'>
    <div className='login-content'>
      <h2>Log in to your account</h2>
      <p>We're happy to see you again!</p>
      <input onChange={handleChange} name='email' placeholder='Email' type="text" />
      <input onChange={handleChange} name='password' placeholder='Password' type="password" />
      <div className="forgot-password-layer"><Link to="/email-initiator/forgot-password">Forgot your password?</Link></div>
      <button onClick={handleLogin} className='cta-login-btn another-added-using-.'><span className='btn-icon'><i className="ri-lock-star-line"></i></span><span>Log in</span></button>
      <p>Don't have an account?<Link to="/signup"> Signup</Link></p>
    </div>
    </div>
  )
}

export default Login
