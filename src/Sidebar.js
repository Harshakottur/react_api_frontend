import React from 'react';
import './Sidebar.css';
import { FaUser, FaQuoteLeft } from 'react-icons/fa';
import { FaTruckArrowRight } from "react-icons/fa6";
import { BiSolidLogOutCircle } from "react-icons/bi";

const Sidebar = ({ onSelect, activeItem }) => {
  return (
    <div className="sidebar">
      <div 
        className={`sidebar-item ${activeItem === 'moves' ? 'active' : ''}`} 
        onClick={() => onSelect('moves')}
      >
        <FaTruckArrowRight /> My Moves
      </div>
      <div 
        className={`sidebar-item ${activeItem === 'profile' ? 'active' : ''}`} 
        onClick={() => onSelect('profile')}
      >
        <FaUser /> My Profile
      </div>
      <div 
        className={`sidebar-item ${activeItem === 'quote' ? 'active' : ''}`} 
        onClick={() => onSelect('quote')}
      >
        <FaQuoteLeft /> GET Quote
      </div>
      <div 
        className={`sidebar-item ${activeItem === 'logout' ? 'active' : ''}`} 
        onClick={() => onSelect('logout')}
      >
        <BiSolidLogOutCircle  /> Logout
      </div>
    </div>
  );
};

export default Sidebar;
