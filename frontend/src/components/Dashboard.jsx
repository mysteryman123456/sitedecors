import React from 'react';
import '../styles/Dashboard.css';
import {Link, NavLink, Outlet} from 'react-router-dom';
import useAuth from "./useAuth";
import Logout from "./Logout";

const Dashboard = () => {

  const handleLogout=()=>{
    Logout();
  }

  useAuth();
  
  return (
    <div className='seller-dashboard'>
      <div className='sidebar'>
        <h2>Dashboard</h2>
        <ul>
        <li>
            <NavLink to="statistics">
            <i className="ri-line-chart-line"></i> Statistics
            </NavLink>
          </li>
          <li>
            <NavLink to="edit-listing">
              <i className="ri-edit-box-line"></i> Edit Listings
            </NavLink>
          </li>
          <li>
            <NavLink to="profile">
              <i className="ri-user-line"></i> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="add-website">
              <i className="ri-add-box-line"></i> Sell Website
            </NavLink>
          </li>
          <li>
            <Link onClick={handleLogout} to="../login">
              <i className="ri-logout-box-r-line"></i> Logout
            </Link>
          </li>
        </ul>
      </div>
      
      <div className='dashboard-content'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
