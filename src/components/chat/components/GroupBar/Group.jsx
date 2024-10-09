import React from 'react';
import './group.css';

const groups = [
    { id: 1, name: 'Group 1', icon: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Group 2', icon: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Group 3', icon: 'https://via.placeholder.com/50' },
  ];
  

  const GroupPanel = () => {
    return (
      <div className="group-panel">
        {groups.map((group) => (
          <div key={group.id} className="group-icon-container">
            <img src={group.icon} alt={group.name} className="group-icon" />
            <span className="group-name">{group.name}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default GroupPanel;
