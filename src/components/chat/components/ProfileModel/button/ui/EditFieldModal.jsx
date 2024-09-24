import React, { useState } from 'react';
import './EditFieldModal.css';

const EditFieldModal = ({ field, value, onClose, onSave }) => {
  const [newValue, setNewValue] = useState(value);

  const handleSave = () => {
    onSave({ target: { name: field, value: newValue } });
    onClose();
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <h2 className="edit-modal-title">Изменить {field}</h2>
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="edit-input-field"
        />
        <div className="edit-button-group">
          <button className="edit-save-button" onClick={handleSave}>Сохранить</button>
          <button className="edit-cancel-button" onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default EditFieldModal;