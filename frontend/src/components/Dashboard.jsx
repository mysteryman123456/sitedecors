import React from 'react';
import '../styles/Dashboard.css';
import { NavLink, Outlet  } from 'react-router-dom';


const Dashboard = () => {

  return (
    <div className='seller-dashboard'>
      <div className='sidebar'>
        <h2>Dashboard</h2>
        <ul>
        <li>
            <NavLink to="statistics">
            <i className="ri-line-chart-fill"></i> Statistics
            </NavLink>
          </li>
          <li>
            <NavLink to="edit-listing">
              <i className="ri-edit-box-fill"></i> Edit Listings
            </NavLink>
          </li>
          <li>
            <NavLink to="profile">
              <i className="ri-user-fill"></i> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="add-website">
              <i className="ri-add-box-fill"></i> Sell Website
            </NavLink>
          </li>
          <li>
            <NavLink to="change-password">
              <i className="ri-key-2-fill"></i> Change Password
            </NavLink>
          </li>
          <li>
            <NavLink to="../">
              <i className="ri-logout-box-r-fill"></i> Logout
            </NavLink>
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
