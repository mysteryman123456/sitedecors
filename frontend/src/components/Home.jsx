import React, { useEffect, useState } from 'react';
import {NavLink, Link , useLocation, useParams} from "react-router-dom";
import categories from '../components/Categories';

const Home = () => {
    const location = useLocation();
    const {category , subcategory} = useParams();
    const[websiteData , setWebsiteData] = useState([]);
    const[loading , setLoading] = useState(true);
    const[n404 , setn404] = useState(false);
    const[filterData , setFilterData]= useState({})

    const fetchData = async()=>{
        setLoading(true);
        setn404(false);
        try{
            const response = await fetch("http://localhost:3008/",{
                method : "POST",
                body : JSON.stringify(filterData),
                headers : {
                    "Content-Type" : "application/json"
                }
            })
            const data = await response.json();
            if(response.ok && response.status === 200){
                setWebsiteData(data.message);
                setLoading(false);
                setn404(false);
            }
            else if(response.status === 404){
                setn404(true);
                setLoading(false);
            }else{
                setn404(true);
                setLoading(false);
            }
        }
        catch(err){
            return
        }
    }

    useEffect(() => {
        setFilterData((prevData) => ({
            ...prevData,
            category: category,
            subcategory: subcategory,
        }));
    }, [category, subcategory]);
    
    useEffect(() => {
        fetchData();
    }, [filterData]); 
    
    const handleChange=(event)=>{
        let {name , value , type} = event.target;
        if(type === "checkbox"){
            value = event.target.checked;
        }
        setFilterData((prevData)=>({...prevData , [name] : value}))
    }

    useEffect(() => {
        const searchInput = document.getElementById("filterSearch");
        const containers = document.querySelectorAll(".container");
        const filterContainers = () => {
          const searchText = searchInput.value.toLowerCase();
          containers.forEach((container) => {
            if (container.textContent.toLowerCase().includes(searchText)) {
              container.style.display = "block";
            } else {
              container.style.display = "none";
            }
          });
        };
        searchInput.addEventListener("input", filterContainers);
      }, []);

      

    function timeAgo(entryTime) {
        const currentDate = new Date();
        const entryDate = new Date(entryTime);
        const diffInTime = currentDate - entryDate;
        const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
        const diffInMonths = currentDate.getMonth() - entryDate.getMonth() + (12 * (currentDate.getFullYear() - entryDate.getFullYear()));
        if (diffInDays === 0) {
            return "Today";
        } else if (diffInDays === 1) {
            return "1 day ago";
        } else if (diffInDays < 30) {
            return `${diffInDays} days ago`;
        } else if (diffInMonths < 12) {
            return `${diffInMonths} months ago`;
        } else {
            return `${Math.floor(diffInMonths / 12)} years ago`;
        }
    }

    const NothingFound = () => {
        return (
          <div style={{height:"300px",display:"flex",alignItems:"center",justifyContent:"center"}} className='product-not-found'>
              <div style={{textAlign:"center"}}>
                <h2 style={{marginBottom:"10px"}}>Requested item not found</h2>
                <p style={{marginBottom:"10px"}}>We're sorry. This item may not exist!</p>
                <i style={{fontSize:"70px"}} className="ri-search-line"></i>
              </div>
            </div>
        )
      }

    const SkeletonLoading=()=>{
        return(
            <>
            <div className="skeleton-card">
                <div className="sk-image skeleton-animation"></div>
                <div className="sk-content">
                    <div className="skeleton-animation sk-title"></div>
                    <div className="skeleton-animation sk-sold-by"></div>
                    <div className="skeleton-animation sk-verify"></div>
                    <div className="sk-description-line">
                        <div className="skeleton-animation sk-description"></div>
                        <div className="skeleton-animation sk-description"></div>
                    </div>
                    <div className="sk-tsu-lin">
                        <div className="skeleton-animation sk-tsu"></div>
                        <div className="skeleton-animation sk-tsu"></div>
                        <div className="skeleton-animation sk-tsu"></div>
                    </div>
                </div>
                <div className="sk-price-content">
                    <div className="sk-price-line">
                        <div className="skeleton-animation sk-price"></div>
                        <div style={{width:"30%"}} className="skeleton-animation sk-price"></div>
                    </div>
                    <div className="sk-btn-wrap">
                        <div className="skeleton-animation sk-btn"></div>
                        <div className="skeleton-animation sk-btn"></div>
                    </div>
                </div>
            </div>
        </>
        );
    }
    
    return (
        <>
        <main>
        <aside>
        <div className='inner-side'>
        <div style={{marginTop:"20px"}} className='filter-text'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(57,57,57,1)"><path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"></path></svg> FILTERS</div>
            <div className="filterSearch">
                <div className="filter-search-bar">
                    <button><i className='ri-search-line'></i></button>
                    <input type="text"  placeholder='Search to Fitler...' name="filterSearch" id="filterSearch" />
                </div>
            </div>
            <div className="container">
                <label>
                <input onChange={handleChange} type="checkbox" name="most_viewed" />
                    Most Viewed
                </label>
            </div>

            <div className="container">
                <label>
                <input onChange={handleChange} type="checkbox" name="verified" />
                    Verified
                </label>
            </div>

            <div className="container">
                <label>
                <input onChange={handleChange} type="checkbox" name="video" />
                    Having explanation video 
                </label>
            </div>

            <div className="container">
                <label>
                <input onChange={handleChange} type="checkbox" name="co_founder" />
                    Seeking for co-founder
                </label>
            </div>

            <div className="container">
                <label>
                <input onChange={handleChange} type="checkbox" name="funds" />
                    Seeking for funds
                </label>
            </div>

            <div className="container">
                <label>
                <input onChange={handleChange} type="checkbox" name="negotiable" />
                    Price negotiable
                </label>
            </div>

            <div className="container">
                <label>
                <input onChange={handleChange} type="checkbox" name="undisclosed" />
                    Price undisclosed
                </label>
            </div>
            
            <div className="container">
                <label htmlFor="sort_price">Sort Price</label>
                <select onChange={handleChange} name="price" id="sort_price">
                    <option value="">Best Match</option>
                    <option value="l_h">Low to High</option>
                    <option value="h_l">High to Low</option>
                </select>
            </div>

            <div className="container">
                <label>Price range</label>
                <div className='price-range'>
                    <input onChange={handleChange} type="number" name="min_price" placeholder="Min Price" />
                    -
                    <input onChange={handleChange} type="number" name="max_price" placeholder="Max Price" />
                </div>
            </div>

            <div className="container">
                <label htmlFor="date">Sort by Upload</label>
                <select onChange={handleChange} name="date" id="date">
                    <option value="">Anytime</option>
                    <option value="recent">Recent</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            <div className="container">
                <label>Sort Rating</label>
                <select onChange={handleChange} name="rating" >
                    <option value="">Best Match</option>
                    <option value="r_l_h">Low to High</option>
                    <option value="r_h_l">High to Low</option>
                </select>
            </div>

            <div className="container rating">
            <label style={{marginTop:"20px",marginBottom:"15px"}}>Ratings&nbsp;<i style={{color:"black"}} className="ri-arrow-up-down-fill"></i></label>
            <label>
                <input onChange={handleChange}  type="checkbox" name="two_star_and_up" />
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
                &nbsp;<span className='r-text'>2 & Up</span>
            </label>

            <div className="rating">
            <label>
                <input onChange={handleChange} type="checkbox" name="three_star_and_up" />
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
                &nbsp;<span className='r-text'>3 & Up</span>
            </label>
            </div>

            <div className="rating">
            <label>
                <input onChange={handleChange} type="checkbox" name="four_star_and_up" />
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-line"></i>
                &nbsp;<span className='r-text'>4 & Up</span>
            </label>
            </div>
            
            <div className="rating">
            <label>
                <input onChange={handleChange} type="checkbox" name="five_star_and_up" />
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                &nbsp;<span className='r-text'>5 & Up</span>
            </label>
            </div>
        </div>
        
        </div>
        </aside>
        <div className="card-container">
        <div className="subcategory-container">
                <div className="subcategories">
                    <ul>
                    {location.pathname === "/" 
                    ? categories.map((value) => (
                        value.subcategories.map((sub, subindex) => (
                            <li key={subindex}>
                            <NavLink 
                                to={`/${value.name.toLowerCase().replace(/ /g, "-")}/${sub.toLowerCase().replace(/ /g, "-")}`}
                            >
                                {sub}
                            </NavLink>
                            </li>
                        ))
                        ))
                    : (location.pathname !== "/" ? categories.map((value) => (
                        value.name.toLowerCase().replace(/ /g, "-") === category &&
                        value.subcategories.map((sub, subindex) => (
                            <li key={subindex}>
                            <NavLink 
                                to={`/${category}/${sub.toLowerCase().replace(/ /g, "-")}`}
                            >
                                {sub}
                            </NavLink>
                            </li>
                        )) 
                        )) : <>
                        <li>
                        <NavLink to={"/"}>
                            Nothing Found
                            </NavLink>
                            </li>
                        </>)
                    }
                    </ul>
                </div>
            </div>
            <section>
            {!loading && n404 === false ? (websiteData.map((item) => (
                <div key={item.web_id} className="card">
                    <div className="card-image">
                        <img src={item.image_url} alt={item.title} />
                        <div className="enlargeImage"><i className="ri-expand-diagonal-fill"></i></div>
                    </div>
                    <div className="card-content">
                        <div className="middle-content">
                            <h3 className="title">{item.title}</h3>
                            <small>Sold By {item.username}</small>
                            <div className="verified">
                                {item.verified ? (
                                    <>
                                    Verified lisitng <i style={{color:"forestgreen"}} className="ri-verified-badge-fill"></i>
                                    </>
                                ) : (
                                    <>
                                    Unverified listing <i style={{color:"crimson"}} className="ri-close-circle-fill"></i>
                                    </>
                                )}
                            </div>
                            <p className="description">{item.description}...</p>
                            <div className="t-s-u">
                            <div className="tsu-content">
                                    <p>Type</p>
                                    <h5>
                                    {item.category
                                        .replace(/-/g, ' ')  
                                        .split(' ')           
                                        .map(word => 
                                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() 
                                        )
                                        .join(' ')}          
                                    </h5>
                                </div>
                                <div className="tsu-content">
                                    <p>Subcategory</p>
                                    <h5>
                                    {item.subcategory
                                        .replace(/-/g, ' ')  
                                        .split(' ')           
                                        .map(word => 
                                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() 
                                        )
                                        .join(' ')}          
                                    </h5>
                                </div>
                                <div style={{borderRight:"1px solid transparent"}} className="tsu-content">
                                    <p>Uploaded</p>
                                    <h5>
                                        {
                                        timeAgo(new Date(item.entry_time).toLocaleDateString())
                                        }
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="last-content">
                            <div className='price-wrap'>
                                <h3 className='price'>{!item.undisclosed ? "NPR " + Intl.NumberFormat('en-IN').format(item.price) : "Undisclosed"}</h3> 
                                <small>{item.negotiable ? <><i className="ri-shake-hands-line"></i> Negotiable</> : <><i className="ri-emotion-normal-line"></i> Non negotiable</>}</small>
                            </div>

                            <div className="view-demo-btn">
                                <Link to={"/"+item.website_url} className='live-btn'>< i className="ri-eye-line"></i>&nbsp;Live&nbsp;Demo</Link>
                                <Link to={"/"+item.category+"/"+item.subcategory+"/"+item.web_id} className='view-btn'>View&nbsp;Listing</Link>
                            </div>
                        </div>
                    </div>
                </div>
                ))) : ((n404 === true ? 
                <>
                    <NothingFound/>
                </> : 
                <>
                    <SkeletonLoading/>
                    <SkeletonLoading/>
                </>)
                )}
            </section>
        </div>
        </main>
        </>
    );
};

export default Home;














