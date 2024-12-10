import React, { useEffect, useState } from 'react'
import { Link , useParams } from 'react-router-dom'

const EmailInitiator = () => {

  const {action} = useParams();

  const[emailInitiatorData , setEmailInitiator] = useState({
    email:"",
    action : action === "forgot-password" ? "f_p" : (action === "verify-account" ? "v_a" : "invalid_action"),
  });

  const[disabled , setDisabled] = useState(false);
  useEffect(()=>{
    setDisabled(!["verify-account", "forgot-password"].includes(action));
  },[])

  const handleChange=(e)=>{
    const {name , value} = e.target;
    setEmailInitiator((prevData)=>({...prevData , [name] : value}))
  }
  return (
    <div className='login-container email-initiator-container'>
    <div className='signup-content email-initiator-content'>
        <h2>Initiator for {action === "forgot-password" ? "Forgot password" : (action === "verify-account") ? "Verify account" : "Invalid action"}</h2>
        <p>Please check email before sending the code!</p>
        <input disabled={disabled} onChange={handleChange} value={emailInitiatorData.email} name='email' placeholder='Email' type="text" />
        <button disabled={disabled} style={disabled == true ? {cursor:"not-allowed",marginTop:"20px"} : {marginTop:"20px"}} className='cta-login-btn'><span className='btn-icon'><i className="ri-key-2-line"></i></span><span>Send Code</span></button>
        <p>Go to Login? <Link to="/login"> Login</Link></p>
    </div>
    </div>
  )
}
export default EmailInitiator
