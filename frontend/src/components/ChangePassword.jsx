import React, { useState } from 'react';
import '../styles/Dashboard.css'; 

const ChangePassword = () => {

  const[passwordData , setPasswordData] = useState({
    new_password : "",
    old_password : "",
    confirm_password : "",
  });

  const handleChange=(e)=>{
    const {name , value} = e.target;
    setPasswordData((prevData)=>({...prevData , [name] : value}))
  }
  const handlePasswordChange=()=>{
    console.log(passwordData)
  }

  return (
    <div className="ch-p-container">
      <h2>Change Password</h2>
        <div className="ch-p-input-group">
          <label htmlFor="oldPassword">Old Password</label>
          <input
          onChange={handleChange}
            name='old_password'
            type="password"
            id="oldPassword"
            placeholder="Enter your old password"
            required
          />
        </div>

        <div className="ch-p-input-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            onChange={handleChange}
            name='new_password'
            type="password"
            id="newPassword"
            placeholder="Enter your new password"
            required
          />
        </div>

        <div className="ch-p-input-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            onChange={handleChange}
            name='confirm_password'
            type="password"
            id="confirmPassword"
            placeholder="Confirm your new password"
            required
          />
        </div>
        <button onClick={handlePasswordChange} className="ch-p-cta-button">Change Password</button>
    </div>
  );
};

export default ChangePassword;