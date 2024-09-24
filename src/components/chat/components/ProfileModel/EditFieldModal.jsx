import React, { useState } from 'react';
import './EditFieldModal.css';

const EditFieldModal = ({ field, value, onClose, onSave }) => {
  const [newValue, setNewValue] = useState(value);

  const handleSave = () => {
    onSave({ target: { name: field, value: newValue } });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Изменить {field}</h2>
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
};

export default EditFieldModal;