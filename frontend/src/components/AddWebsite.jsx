import React, { useState } from "react";
import "../styles/AddWebsite.css";
import categories from "../components/Categories";

const AddWebsite = () => {  
  const bodyTag = "<body>"
  const[copyReactIcon,setReactCopyIcon] = useState(false);
  const[copyHtmlIcon,setHtmlCopyIcon] = useState(false);
  const copyHtmlText = "<small style='display:none;'>SiteDecors-Verified-Listing</small>";
  const copyReactText = '<small style={{display:"none"}}>SiteDecors-Verified-Listing</small>';
  const copyHtmlCode = () => {
    navigator.clipboard
      .writeText(copyHtmlText)
      .then(() => {
        setHtmlCopyIcon(true);
        setTimeout(()=>{
          setHtmlCopyIcon(false);
        },1000)
      })
      .catch((err) => {
        setHtmlCopyIcon(false);
        console.error("Failed to copy");
      });
  }

  const copyReactCode = () => {
    navigator.clipboard
      .writeText(copyReactText)
      .then(() => {
        setReactCopyIcon(true);
        setTimeout(()=>{
          setReactCopyIcon(false);
        },1000)
      })
      .catch((err) => {
        setReactCopyIcon(false);
        console.error("Failed to copy");
      });
  }

  const[formData , setFormData] = useState({
    category : "",
    title : "",
    subcategory : "",
    price : "",
    negotiable : false,
    undisclosed : false,
    description : "",
    technical_description : "",
    assets : [],
    images : [],
    site_url : "",
    video_url : "",
    co_founder : false,
    funds : false,
  });

 const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter((file) =>
      ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file.type)
    );
    if (validFiles.length === 0) {
      alert("Please provide valid files");
      return;
    }
    validFiles.forEach((file)=>{
      const previewImage = URL.createObjectURL(file);
      setFormData((prevData)=>({...prevData , images : [...prevData.images , {"image":file, "previewImage": previewImage}]}))
    })
  };

  const removeImage = (index) => {
    setFormData((prevData) => ({
      ...prevData, 
      images: prevData.images.filter((_,i) => i !== index), 
    }));
  };
 
  console.log(formData)

  const handleAssetChange = (e) => {
    const value = e.target.value;
    if(e.target.checked){
      setFormData({...formData , assets : [...formData.assets , value]})
    }else{
      setFormData({...formData , assets :formData.assets.filter((asset)=>asset !== value)})
    } 
  };

  const handleChange=(e)=>{
    const{name , value} = e.target;
    setFormData({...formData , [name] : value});
    console.log(formData)
  }


  return (
    <>
    <div className="add-page">
      <div className="columns">
        <div className="column">
          <div className="container">
            <h3>General Information</h3>
            <label>Title</label>
            <input name="title" onChange={handleChange} value={formData.title} placeholder="e.g, Automated ecommerce web app for sale" type="text" />

            {/* Categories and subcategories */}
            <label>Category</label>
            <select 
              required 
              onChange={handleChange} 
              name="category"
              defaultValue=""
            >
              <option value="" disabled>Select category</option>
              {categories.map((category, index) => (
                <option 
                  key={index} 
                  value={category.name.toLowerCase().replace(/ /g, "-")}
                >
                  {category.name}
                </option>
              ))}
            </select>
            {
              categories.map((cat)=>(
                cat.name.toLowerCase().replace(/ /g , "-") === formData.category.toLowerCase().replace(/ /g, "-") ? 
                (<>
                  <label>Sub Category</label>
                  <select defaultValue="" onChange={handleChange} value={formData.subcategory} name="subcategory">
                    <option disabled value="">Select Subcategory</option>
                    {
                  cat.subcategories.map((subcategory)=>(
                    <option value={subcategory.toLowerCase().replace(/ /g , "-")}>{subcategory}</option>
                  ))}
                  </select>
                  </>
                )
                 : 
                (
                  ""
                )
              ))
            }

            <label>Description</label>
            <textarea onChange={handleChange} name="description" value={formData.description} placeholder="e.g, Description about this website"></textarea>
          </div>

          <div className="container">
            <h3>Technical Details</h3>
            <label>What buyer needs to know?</label>
            <textarea onChange={handleChange} name="technical_description" value={formData.technical_description} placeholder="e.g, Details about included hosting services, integrations like Cloudinary , Firebase, or any limitations buyers should be aware of..."></textarea>

            <label>Assets buyer will be recieving after purchase</label>
            <div className="items-sold">
                <input value="Code Files" onChange={handleAssetChange} name="assets" id="code" type="checkbox" />
                <label htmlFor="code">Code Files</label>
                <input value="Design Files" onChange={handleAssetChange} name="assets" id="designFiles" type="checkbox" />
                <label htmlFor="designFiles">Design Files</label>
                <input value="Domain" onChange={handleAssetChange} name="assets" id="domain" type="checkbox" />
                <label htmlFor="domain">Domain Name</label>
                <input value="Hosting Credentials" onChange={handleAssetChange} name="assets" id="hosted_account" type="checkbox" />
                <label htmlFor="hosted_account">Hosting Credentials</label>
                <input value="Email Account" onChange={handleAssetChange} name="assets" id="email_account" type="checkbox" />
                <label htmlFor="email_account">Email Account</label>
            </div><br/><br/>
            <small>Hosting credentials refers to login details of that particular platform where your website is hosted</small>
          </div>
          
          <div className="container price-container">
            <h3>Pricing Details</h3>
            <label>Price</label>
            <input onChange={handleChange} name="price" value={formData.price} type="number" placeholder="Enter price" />

            <div className="negotiable">
                <div>
                    <input value={formData.negotiable} onChange={(e) => setFormData((prevData)=>({...prevData , negotiable : e.target.checked}))} id="negotiable" name="negotiable" type="checkbox" />
                    <label htmlFor="negotiable">Negotiable</label>
                </div>
                <div>
                    <input value={formData.undisclosed} onChange={(e)=>setFormData((prevData)=>({...prevData , undisclosed : e.target.checked}))} id="undisclosed" name="undisclosed" type="checkbox" />
                    <label htmlFor="undisclosed">Undisclosed</label>
                </div>
            </div>

          </div>
        </div>

        <div className="column">

          <div className="container">
            <h3>Upload Image</h3>
            <div onDragOver={handleDragOver} onDrop={handleDrop} className="drag-drop">
              <i class="ri-image-add-fill"></i>
              <p>Drag & Drop images to upload</p>
              <small>Png , Jpg , Webp formats only</small>
            </div>
            {formData.images && formData.images.length > 0 ? (
                formData.images.map((image, index) => (
                  <div key={index} className="websiteImage">
                    <div onClick={()=>removeImage(index)} className="closeImage"><span>< i className="ri-close-line"></i></span></div>
                    <img width={100} height={100} key={index} src={image.previewImage} alt={`Upload`} />
                  </div>
                ))
              ) : (
                ""
              )}
          </div>

          <div className="container">
            <h3>Additional Information</h3>

            <label>Website's landing page url</label>
            <input onChange={handleChange} value={formData.site_url} name="site_url" type="url" placeholder="e.g, sitedecors.com" />

            <label>Explanation video url (<small>optional</small>)</label>
            <input  onChange={handleChange} value={formData.video_url}  name="video_url" type="url" placeholder="e.g, https://www.youtube.com/watch?v=abcdef12345" />

            <div className="check-group">
              <p>Are you seeking for co-founder?</p>
              <div className="label-check">
                  <input onChange={(e)=>setFormData({...formData , co_founder : true})}  id="co-founder-yes" name="co-founder" value="yes" type="radio" />
                  <label htmlFor="co-founder-yes">Yes</label>
                  <input onChange={(e)=>setFormData({...formData , co_founder : false})}  id="co-founder-no" name="co-founder" value="no" type="radio" />
                  <label htmlFor="co-founder-no">No</label>
              </div>
            </div>
            <div className="check-group">
                <p>Are you seeking for funds?</p>
                <div className="label-check">
                    <input onChange={(e)=>setFormData({...formData , funds : true})} id="funds-yes" value={formData.funds} name="funds"  type="radio" />
                    <label htmlFor="funds-yes">Yes</label>
                    <input onChange={(e)=>setFormData({...formData , funds : false})}  value={formData.funds} id="funds-no" name="funds" type="radio" />
                    <label htmlFor="funds-no">No</label>
                </div>
            </div>
          </div>
          <div className="container owner">
            <h3>Ownership</h3>
            <label>Html Code</label>
            <div className="ownership-code">
              <span>
                {copyHtmlText}
              </span>
              <div onClick={copyHtmlCode} className="copy-icon">
                {copyHtmlIcon === true ? <i className="ri-check-double-line"></i> : <i className="ri-clipboard-fill"></i>}
              </div>
            </div>
            <label>React Code</label>
            <div className="ownership-code">
              <span>
                {copyReactText}
              </span>
              <div onClick={copyReactCode} className="copy-icon">
                {copyReactIcon === true ? <i className="ri-check-double-line"></i> : <i className="ri-clipboard-fill"></i>}
              </div>
            </div>
            <small>Add the above code to your main landing page just below your {bodyTag} tag to verify your listing. Your listing will be verfied ASAP!</small>
          </div>
        </div>
      </div>
    </div>
      <div className="submit-row">
      <div className="btn-grp">
        <button className="upload">Publish your listing</button>
      </div>
    </div>
    </>
  );
};

export default AddWebsite;
