import React, { useState } from 'react';

const StationRow = ({ station, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStation, setEditedStation] = useState({ ...station });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStation({ ...editedStation, [name]: value });
  };

  const handleSave = () => {
    onEdit(editedStation);
    setIsEditing(false);
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td><input name="name" value={editedStation.name} onChange={handleChange} /></td>
          <td><input name="coordinates" value={editedStation.coordinates} onChange={handleChange} /></td>
          <td><input name="address" value={editedStation.address} onChange={handleChange} /></td>
          <td><input name="description" value={editedStation.description} onChange={handleChange} /></td>
          <td>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>{station.name}</td>
          <td>{station.coordinates}</td>
          <td>{station.address}</td>
          <td>{station.description}</td>
          <td>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(station.id)}>Delete</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default StationRow;
