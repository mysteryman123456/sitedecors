import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';
import { useSession } from '../context/SessionContext';
import Categories from "./Categories";

const SingleEditCard = ({ data , function : fetchData }) => {
  const[editDetails , setEditDetails] = useState({
    title: '',
    price: '',
    website_url: '',
    negotiable: false,
    undisclosed: false,
    co_founder: false,
    funds: false,
    category: '',
    subcategory: '',
    description: '',
    seller_email: '',
    web_id: ''
  })

  const { sessionData } = useSession();

  useEffect(() => {
    setEditDetails(data);
    if (sessionData?.email) {
      setEditDetails((prevData) => ({
        ...prevData,
        seller_email: sessionData.email,
        web_id: data.web_id,
      }));
    }
  }, [data, sessionData]);

  const updateDetails = async () => {
    try {
      const response = await fetch("http://localhost:3008/update-listing", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(editDetails), 
      });
      const result = await response.json();
      if (response.ok) {
        window.success(result.message);
        fetchData();
      } else {
        window.failrue(result.message);
      }
    } catch (error) {
      window.failure("Please try again later");
    }
  };
  const handleChange =(event)=>{
    let {name , value , type} = event.currentTarget;
    if(type === "checkbox"){
      value = event.currentTarget.checked;
    }
    setEditDetails((prevData)=>({...prevData , [name] : value}))
  }
  return (
    <div className="single-edit-card">

      <div className="edit-card-row">
        <label htmlFor="title">Title</label>
        <textarea name='title' onChange={handleChange} value={editDetails.title} id="title" />
      </div>

      <div className="edit-card-row">
        <label htmlFor="price">Price</label>
        <input name='price' onChange={handleChange} value={editDetails.price} type="number" id="price"  />
      </div>

      <div className="edit-card-row">
        <label htmlFor="url">Website URL</label>
        <input name='website_url' onChange={handleChange} value={editDetails.website_url} type="url" id="url"  />
      </div>

      <div className="edit-card-row edit-card-checkbox">
        <div className='edit-checkbox'>
          <input name='negotiable' onChange={handleChange} id='negotiable' checked={editDetails.negotiable} type="checkbox" />    
          <label htmlFor="negotiable">Negotiable</label>
        </div>
        <div className='edit-checkbox'>
          <input name='undisclosed' onChange={handleChange} id='undisclosed' checked={editDetails.undisclosed} type="checkbox"/>    
          <label htmlFor="undisclosed">Undisclosed</label>
        </div>
        <div className='edit-checkbox'>
          <input name='co_founder' onChange={handleChange} id='co_founder' checked={editDetails.co_founder} type="checkbox"/>    
          <label htmlFor="co_founder">Seeking co-founder</label>
        </div>
        <div className='edit-checkbox'>
          <input name='funds' onChange={handleChange} id='funds' checked={editDetails.funds} type="checkbox"/>    
          <label htmlFor="funds">Seeking funds</label>
        </div>
      </div>
      <div className="edit-card-row">
        <label htmlFor="category">Category</label>
        <select onChange={handleChange} id="category" name="category" value={editDetails.category}>
          {Categories.map((category) => (
            <option key={category.name} value={category.name.replace(/ /g, "-").toLowerCase()}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="edit-card-row">
        <label htmlFor="subcategory">Subcategory</label>
        <select value={editDetails.subcategory} onChange={handleChange} id="subcategory" name="subcategory">
          {Categories.map((category) => {
            if (category.name.toLowerCase().replace(/ /g , "-") === editDetails.category) {
              return category.subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory.toLowerCase().replace(/ /g , "-")}>
                  {subcategory}
                </option>
              ));
            }
            return null; 
          })}
        </select>
      </div>

      <div className="edit-card-row">
        <label htmlFor="description">Description</label>
        <textarea onChange={handleChange} name='description' id="description" value={editDetails.description}></textarea>
      </div>

      <button onClick={updateDetails} className="save-button">Save Changes</button>

    </div>
    
  );
};

export default SingleEditCard;
