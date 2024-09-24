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
        <h2 className="modal-title">Изменить {field}</h2>
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="input-field"
        />
        <div className="button-group">
          <button className="save-button" onClick={handleSave}>Сохранить</button>
          <button className="cancel-button" onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default EditFieldModal;