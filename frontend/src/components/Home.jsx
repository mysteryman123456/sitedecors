import React, { useEffect, useState } from 'react';
import {NavLink , useLocation, useParams} from "react-router-dom";
import categories from '../components/Categories';

const Home = () => {
    const location = useLocation();
    const {category , subcategory} = useParams();

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


    console.log(subcategory);
    
    return (
        <>
        <main>
        <aside>
        <div className='inner-side'>
        <div style={{marginTop:"20px"}} className='filter-text'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(57,57,57,1)"><path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z"></path></svg> FILTERS</div>
            <div className="filterSearch">
                <div className="filter-search-bar">
                    <button><i className='ri-search-line'></i></button>
                    <input type="text" placeholder='Search to Fitler...' name="filterSearch" id="filterSearch" />
                </div>
            </div>
            <div className="container">
                <label>
                <input type="checkbox" name="most_viewed" />
                    Most Viewed
                </label>
            </div>

            <div className="container">
                <label>
                <input type="checkbox" name="verified" />
                    Verified
                </label>
            </div>

            <div className="container">
                <label>
                <input type="checkbox" name="video" />
                    Having explanation video 
                </label>
            </div>

            <div className="container">
                <label>
                <input type="checkbox" name="co-founder" />
                    Seeking for co-founder
                </label>
            </div>

            <div className="container">
                <label>
                <input type="checkbox" name="funds" />
                    Seeking for funds
                </label>
            </div>

            <div className="container">
                <label>
                <input type="checkbox" name="negotiable" />
                    Price negotiable
                </label>
            </div>

            <div className="container">
                <label>
                <input type="checkbox" name="undisclosed" />
                    Price undisclosed
                </label>
            </div>
            
            <div className="container">
                <label htmlFor="sort_price">Sort Price</label>
                <select name="price" id="sort_price">
                <option value="best">Best Match</option>
                <option value="l_h">Low to High</option>
                <option value="h_l">High to Low</option>
                </select>
            </div>

            <div className="container">
                <label>Price range</label>
                <div className='price-range'>
                    <input type="number" name="min_price" placeholder="Min Price" />
                    -
                    <input type="number" name="max_price" placeholder="Max Price" />
                    <button><i className="ri-arrow-right-s-line"></i></button>
                </div>
            </div>

            <div className="container">
                <label htmlFor="date">Sort by Upload</label>
                <select name="date" id="date">
                <option value="">Anytime</option>
                <option value="recent">Recent</option>
                <option value="oldest">Oldest</option>
                </select>
            </div>

            <div className="container">
                <label>Sort Rating</label>
                <select name="rating" >
                <option value="best">Best Match</option>
                <option value="r_l_h">Low to High</option>
                <option value="r_h_l">High to Low</option>
                </select>
            </div>

            <div className="container rating">
            <label style={{marginTop:"20px",marginBottom:"15px"}}>Ratings&nbsp;<i style={{color:"black"}} className="ri-arrow-up-down-fill"></i></label>
            <label>
                <input type="checkbox" name="2_star_and_up" />
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
                <i className="ri-star-line"></i>
                &nbsp;<span className='r-text'>2 & Up</span>
            </label>

            <div className="rating">
            <label>
                <input type="checkbox" name="3_star_and_up" />
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
                <input type="checkbox" name="4_star_and_up" />
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
                <input type="checkbox" name="5_star_and_up" />
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                <i className="ri-star-fill"></i>
                &nbsp;<span className='r-text'>5 & Up</span>
            </label>
            </div>
        </div>
            <div className="reset-search-btn">
                <button className="reset">Reset All</button>
                <button className="filter">Filter</button>
            </div>
        </div>
        </aside>
        <div className="card-container">
        <div style={location.pathname === "/" ||  !categories.some((value) => value.name.toLowerCase().replace(/ /g, "-") === category) ? { display: "none" } : {}}className="subcategory-container">
                <p>Related subcategories :&nbsp;</p>
                <div className="subcategories">
                    <ul>
                        {
                            categories.map((value)=>(
                                value.name.toLowerCase().replace(/ /g,"-") === category ?
                                value.subcategories.map((sub,subindex)=>(<li key={subindex}><NavLink key={subindex} to={"/"+category+"/"+sub.toLowerCase().replace(/ /g,"-")}>{sub}</NavLink></li>)) : ""
                            ))
                        }
                    </ul>
                </div>
            </div>
            <section>

            </section>
        </div>
        </main>
        </>
    );
};

export default Home;














