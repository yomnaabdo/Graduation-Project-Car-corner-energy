import React, { useState, useEffect } from "react";
import axios from "axios";
//import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "../css/ManageStations.css";
import StationRow from "./StationRow";
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { Button, Form } from 'react-bootstrap';

// const mapContainerStyle = {
//   width: "100%",
//   height: "200px",
// };

// const center = {
//   lat: 35.7209, // Default latitude
//   lng: -79.1766, // Default longitude
// };

const YourComponent = (props) => {
  let {_id}= useParams();
  const [StationName, setStationName] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [marker, setMarker] = useState(props.center);
  const [stations, setStations] = useState([]);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false); // Added this line
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [editStationId, setEditStationId] = useState(null); // Define editStationId state
  const [editStationData, setEditStationData] = useState({}); // Define editStationData state


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/stations/getAllStations");
        setStations(response.data.data); // Assuming the data array is under 'data' key
       
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleDelete = (stationId) => {
    if (window.confirm("Are you sure you want to delete this station?")) {
      axios.delete(`/api/v1/stations/${stationId}`)
        .then(() => {
          setStations(stations.filter((station) => station._id !== stationId));
         
        })
        .catch((error) => {
          console.error("Error deleting station:", error);
          alert("Failed to delete station");
        });
    }
  };
  

  const handleEdit = (updatedStation) => {
    // Assuming you have state variables for editStationId and editStationData
    setEditStationId(updatedStation._id);
    setEditStationData({
      StationName: updatedStation.StationName,
      coordinates: updatedStation.coordinates,
      address: updatedStation.address,
      description: updatedStation.description,
      marker: updatedStation.marker
    });
  };
  
  const handleSaveEdit = () => {
    axios.put(`/api/v1/stations/update/${editStationId}`, editStationData)
      .then(() => {
        setStations(stations.map(station =>
          station._id === editStationId ? { ...station, ...editStationData } : station
        ));
        setShowUpdateAlert(true);
        setTimeout(() => setShowUpdateAlert(false), 2000);
      })
      .catch(error => {
        console.error('Error updating station:', error);
        alert('Station update failed');
      });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newStation = { StationName, coordinates, address, description, marker };

    // Validate coordinates before sending
    if (coordinates.length !== 2 || isNaN(coordinates[0]) || isNaN(coordinates[1])) {
        alert("Please enter valid coordinates.");
        return;
    }

    axios.post("/api/v1/stations/pin-station", newStation)
        .then(() => {
            setStations([...stations, newStation]);
            setStationName("");
            setCoordinates([]);
            setAddress("");
            setDescription("");
            setMarker(props.center);
            // alert("Station added successfully");
            setShowAddSuccess(true);
          setTimeout(() => setShowAddSuccess(false), 2000);
        })
        .catch((error) => {
            console.error("Error adding station:", error);
            alert("Failed to add station");
        });
};


  // const handleMapClick = (event) => {
  //   setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  // };

  // if (loadError) return <div>Error loading maps</div>;
  // if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Station Name</th>
            <th>Coordinates</th>
            <th>Address</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stations.map(station => (
            <tr key={station._id}>
              {editStationId === station._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editStationData.StationName}
                      onChange={(e) => setEditStationData({ ...editStationData, StationName: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editStationData.coordinates ? editStationData.coordinates.join(',') : ''}
                      onChange={(e) => {
                        const coords = e.target.value.split(',').map(Number);
                        setEditStationData({ ...editStationData, coordinates: coords });
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editStationData.address}
                      onChange={(e) => setEditStationData({ ...editStationData, address: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editStationData.description}
                      onChange={(e) => setEditStationData({ ...editStationData, description: e.target.value })}
                    />
                  </td>
                  <td>
                    <Button variant="success" onClick={handleSaveEdit}>Save</Button >
                    <Button variant="secondary" onClick={() => setEditStationId(null)}>Cancel</Button>
                    <Alert variant="success" show={showUpdateAlert}>
                      <Alert.Heading>Station updated successfully</Alert.Heading>
                     
                    </Alert>
                  </td>
                </>
              ) : (
                <>
                  <td>{station.StationName}</td>
                  <td>{station.coordinates}</td>
                  <td>{station.address}</td>
                  <td>{station.description}</td>
                  <td>
                  <Button variant="warning" onClick={() => handleEdit(station)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDelete(station._id)}>Delete</Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="container-add-stations">
  <h2>Add a station</h2>
  <form onSubmit={handleSubmit} className="add-station-form">
    <div className="form-group">
      <label htmlFor="stationName">Station Name</label>
      <input
        type="text"
        id="stationName"
        value={StationName}
        onChange={(e) => setStationName(e.target.value)}
        placeholder="Station Name"
        required
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label htmlFor="coordinates">Coordinates</label>
      <input
        type="text"
        id="coordinates"
        value={coordinates.join(',')}
        onChange={(e) => {
          const coords = e.target.value.split(',').map(Number);
          setCoordinates(coords);
        }}
        placeholder="Coordinates (e.g., longitude,latitude)"
        required
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
        className="form-control"
      />
    </div>
    <div className="form-group">
      <label htmlFor="description">Description</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="form-control"
      />
    </div>
    <Button variant="success" type="submit">Add Station</Button>
    <Alert variant="success" show={showAddSuccess}>
      <Alert.Heading>station added successfully</Alert.Heading>
    </Alert>
  </form>
</div>


    </div>
  );
  
  
}

export default  YourComponent;
