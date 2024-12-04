import React, { useState } from 'react';
import Placeholder from '../Static/Images/placeholder.jpeg';
import '../styles/Dashboard.css'; 

const Profile = () => {
  const[profileData , setProfileData] = useState({
    profile_image : [],
    fullname : "",
    email : "",
    phonenumber : "",
  })

  const handleFileChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => 
      ['image/png', 'image/webp', 'image/jpg', 'image/jpeg'].includes(file.type) && file.size < 1 * 1024 * 1024
    );
    if (validFiles.length === 1) {
      validFiles.forEach((file) => {
        const previewImage = URL.createObjectURL(file);
        setProfileData((prevData) => ({
          ...prevData , profile_image: [...prevData.profile_image, {"previewImage" : previewImage, "image" : file}],
        }));
      });
    } else {
      return;
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    document.getElementById('fileInput').click();
  };

  const removeImage = (e) => {
    e.preventDefault();
    setProfileData((prevData)=>({...prevData , profile_image : []}))
  };

  const handleChange=(e)=>{
    const {name , value} = e.target;
    setProfileData((prevData)=>({...prevData , [name] : value}))
  }

  const handleProfile=()=>{
    if(profileData.profile_image.length > 0){
      console.log(profileData.profile_image[0].image)
    }
  }

  return (
    <div className="ch-p-container">
      <h2>Edit Profile</h2>
      <div className="ch-p-image-cta">
        <div className="ch-p-profile-image">
          <img className='ch-p-image' src={profileData.profile_image.length == 1 ? profileData.profile_image[0].previewImage : Placeholder} alt="" />
        </div>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
            <div className='ch-p-btn-group'>
              <button className='ch-p-addImage' onClick={handleImageClick}>Change photo</button>
              <button className='ch-p-removeImage' onClick={removeImage}><i style={{color:"crimson"}} className='ri-delete-bin-line'></i>Remove</button>
            </div>
          </div>
        <div className="ch-p-input-group">
          <label htmlFor="fullName">Full Name</label>
          <input
          onChange={handleChange}
          name='fullname'
            type="text"
            id="fullName"
            placeholder='Enter your fullname'
            required
          />
        </div>

        <div className="ch-p-input-group">
          <label htmlFor="phoneNumber">Phonenumber</label>
          <input
            onChange={handleChange}
            name='phonenumber'
            type="text"
            id="phoneNumber"
            placeholder='Enter your phonenumber'
          />
        </div>

        <div className="ch-p-input-group">
          <label htmlFor="email">Email</label>
          <input
                      onChange={handleChange}
                      name='email'
            type="email"
            id="email"
            placeholder='Email will appear here'
            readOnly
            disabled
          />
        </div>
        <button onClick={handleProfile} className="ch-p-cta-button">Save Profile</button>
    </div>
  );
};

export default Profile;