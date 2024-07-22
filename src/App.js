import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MoveDetails from './MoveDetails';
import './App.css';

const App = () => {
  const [activeItem, setActiveItem] = useState('moves');

  const handleSelect = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="App">
      <Sidebar activeItem={activeItem} onSelect={handleSelect} />
      <div className="content">
        {activeItem === 'moves' && <MoveDetails />}
        {activeItem === 'profile' && <h2>Profile Content</h2>}
        {activeItem === 'quote' && <h2>Get Quote Content</h2>}
        {activeItem === 'logout' && <h2>Logout Content</h2>}
      </div>
    </div>
  );
}; 

export default App;
