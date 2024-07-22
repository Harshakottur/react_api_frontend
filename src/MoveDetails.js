import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHome, FaArrowCircleRight, FaCalendarDay, FaRuler, FaRoute } from 'react-icons/fa';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { TfiAlert } from "react-icons/tfi";
import './MoveDetails.css';

const MoveDetails = () => {
  const [moves, setMoves] = useState([]);
  const [openDetails, setOpenDetails] = useState(null);
  const [openInventory, setOpenInventory] = useState({});

  useEffect(() => {
    axios.get('http://test.api.boxigo.in/sample-data/')
      .then(response => {
        setMoves(response.data.Customer_Estimate_Flow || []);
        console.log(response.data.Customer_Estimate_Flow);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleToggleDetails = (index) => {
    setOpenDetails(openDetails === index ? null : index);
  };

  const handleToggleInventory = (moveIndex, categoryId) => {
    setOpenInventory(prev => ({
      ...prev,
      [moveIndex]: {
        ...prev[moveIndex],
        [categoryId]: !prev[moveIndex]?.[categoryId]
      }
    }));
  };

  const renderInventoryItems = (items) => {
    return items.map((item, itemIdx) => (
      <div key={itemIdx} className="sub-item">
        <p>
          {item.displayName}
          <span className="item-qty">{item.qty || '1'}</span>
        </p>
        {/* Iterate over item.type array to display each type.option */}
        <div className="item-type-options">
          {item.type.map((typeOption, index) => (
            <div key={index} className="type-option">
              {typeOption.option}
            </div>
          ))}
        </div>
      </div>
    ));
  };
  

  return (
    <div className="move-details-container">
      <h2>My Moves</h2>
      {moves.length > 0 ? moves.map((move, moveIndex) => (
        <div key={moveIndex} className="move-card">
          <div className="move-card-header">
            <div className="move-card-header-content">
              <div className="info-item">
                <strong>From</strong>
                <p className="small-text">{move.moving_from}</p>
              </div>
              <FaArrowCircleRight className="icon arrow-icon" />
              <div className="info-item">
                <strong>To</strong>
                <p className="small-text">{move.moving_to}</p>
              </div>
              <div className="info-item request-id">
                <strong>Request#</strong>
                <p className="id-small-text">{move.estimate_id}</p>
              </div>
            </div>
            <div className="move-details-info">
              <div className="info-item">
                <FaHome className="icon" /> <span className="small-text">{move.property_size}</span>
              </div>
              <div className="info-item">
                <FaRuler className="icon" /> <span className="small-text">{move.new_floor_no}</span>
              </div>
              <div className="info-item">
                <FaRoute className="icon" /> <span className="small-text">{move.distance}</span>
              </div>
              <div className="info-item">
                <FaCalendarDay className="icon" /> <span className="small-text">{move.date_created}</span>
              </div>
              <button className="view-details-button" onClick={() => handleToggleDetails(moveIndex)}>
                {openDetails === moveIndex ? 'Hide Details' : 'View Move Details'}
              </button>
              <button className="quote-button">Quotes Awaiting</button>
            </div>
          </div>
          <div className="disclaimer">
          <TfiAlert className="disclaimer-icon" /> <strong>Disclaimer:</strong> Please update your move date before two days of shifting
          </div>
          {openDetails === moveIndex && (
            <div className="move-card-body">
              <div className="inventory-section">
              <h3>Inventory Details</h3>
              <button className="btn-edit">Edit Inventory</button>
              {move.items?.inventory?.map((category) => (
                <div key={category.id} className="move-item" onClick={() => handleToggleInventory(moveIndex, category.id)}>
                  <div className="item-icons">
                    <div className="item-text">
                      <span>{category.displayName}</span>
                      <span className="item-count">{category.category.length}</span>
                    </div>
                    {openInventory[moveIndex]?.[category.id] ? <IoIosArrowUp className="icon" /> : <IoIosArrowDown className="icon" />}
                  </div>
                  {openInventory[moveIndex]?.[category.id] && (
                    <div className="item-details">
                      {category.category?.map((subCategory) => (
                        <div key={subCategory.id} className="sub-category">
                          <h5>{subCategory.displayName}</h5>
                          {renderInventoryItems(subCategory.items)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              </div>
              <div className="house-details">
              <h3>House Details</h3>
              <button className="btn-edit">Edit House Details</button>
                <h4 className='house'>Existing House Details</h4>
                <div className="new-house-details">
                  <div className="info-item">
                    <strong>Floor No:</strong>
                    <p className="small-text">{move.old_floor_no}</p>
                  </div>
                  <div className="info-item">
                    <strong>Elevator Available:</strong>
                    <p className="small-text">{move.old_elevator_availability}</p>
                  </div>
                  <div className="info-item">
                    <strong>Distance from truck to door:</strong>
                    <p className="small-text">{move.old_parking_distance}</p>
                  </div>
                  <div className="info-item">
                    <strong>Additional Information:</strong>
                    <p className="small-text">{move.old_house_additional_info || 'No additional info'}</p>
                  </div>
                </div>
              </div>
              <div className="house-details">
                <h4 className='house'>New House Details</h4>
                <div className="new-house-details">
                  <div className="info-item">
                    <strong>Floor No:</strong>
                    <p className="small-text">{move.new_floor_no}</p>
                  </div>
                  <div className="info-item">
                    <strong>Elevator Available:</strong>
                    <p className="small-text">{move.new_elevator_availability}</p>
                  </div>
                  <div className="info-item">
                    <strong>Distance from truck to door:</strong>
                    <p className="small-text">{move.new_parking_distance}</p>
                  </div>
                  <div className="info-item">
                    <strong>Additional Information:</strong>
                    <p className="small-text">{move.new_house_additional_info || 'No additional info'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )) : (
        <p>No moves available</p>
      )}
    </div>
  );
};

export default MoveDetails;
