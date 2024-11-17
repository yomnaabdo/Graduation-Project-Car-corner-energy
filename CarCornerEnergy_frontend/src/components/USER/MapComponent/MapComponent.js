
import React from 'react';

import MyLocation from '../MyLocation/MyLocation';
function MapComponent() {
    
    
        return (
        <div style={{marginTop:'120px',marginBottom:'50px' }}>
          <div className="App">
            <MyLocation />
          </div>
          </div>
        );
      }
      
    


export default MapComponent;


////////////////////////
///////////////////////////////
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'ol/ol.css';
// import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import { OSM, Vector } from 'ol/source';
// import { fromLonLat } from 'ol/proj';
// import Feature from 'ol/Feature';
// import Point from 'ol/geom/Point';
// import { Style, Icon } from 'ol/style';

// function MapComponent({ apiKey }) {
//     const [location, setLocation] = useState('');
//     const [nearestGasStation, setNearestGasStation] = useState(null);
//     const [map, setMap] = useState(null);
//     const [error, setError] = useState(null);

//     const handleLocationChange = (e) => {
//         setLocation(e.target.value);
//     };

//     const handleShowLocation = async () => {
//         if (map && location) {
//             const coordinates = fromLonLat(location.split(',').map(parseFloat));
//             map.getView().animate({ center: coordinates, zoom: 10 });

//             const marker = new Feature(new Point(coordinates));
//             marker.setStyle(
//                 new Style({
//                     image: new Icon({
//                         src: 'https://openlayers.org/en/latest/examples/data/icon.png',
//                     }),
//                 })
//             );

//             const vectorLayer = new Vector({
//                 source: new Vector({
//                     features: [marker],
//                 }),
//             });

//             map.addLayer(vectorLayer);

//             try {
//                 // Get nearest gas station
//                 const response = await axios.get(`/api/v1/stations/nearby?`);
//                 setNearestGasStation(response.data);

//                 // Pin nearest gas station on the map
//                 const nearestGasStationCoordinates = fromLonLat([response.data.coordinates[0], response.data.coordinates[1]]);
//                 const nearestGasStationMarker = new Feature(new Point(nearestGasStationCoordinates));
//                 nearestGasStationMarker.setStyle(
//                     new Style({
//                         image: new Icon({
//                             src: 'https://maps.gstatic.com/mapfiles/place_api/icons/gas_station-71.png',
//                         }),
//                     })
//                 );

//                 vectorLayer.getSource().addFeature(nearestGasStationMarker);

//                 // POST request to pin gas station on map
//                 const pinResponse = await axios.post('/api/v1/stations/pin', {
//                     StationName: response.data.StationName,
//                     coordinates: [response.data.coordinates[0], response.data.coordinates[1]],
//                 });
//                 console.log('Response from pinning station:', pinResponse.data);
//             } catch (error) {
//                 console.error('Error fetching nearest gas station or pinning station:', error);
//                 setError('Failed to fetch nearest gas station or pin gas station');
//             }
//         }
//     };

//     useEffect(() => {
//         const initMap = () => {
//             const initialCoordinates = fromLonLat([0, 0]);
//             const initialView = new View({
//                 center: initialCoordinates,
//                 zoom: 2,
//             });

//             const initialMap = new Map({
//                 target: 'map',
//                 layers: [
//                     new TileLayer({
//                         source: new OSM(),
//                     }),
//                 ],
//                 view: initialView,
//             });

//             return initialMap;
//         };

//         const map = initMap();
//         setMap(map);

//         return () => {
//             map.setTarget(null);
//         };
//     }, []);

//     return (
//         <div className="container" style={{ marginTop: '100px' }}>
//             <div className="row">
//                 <div className="col-md-6 offset-md-3">
//                     <div className="text-center">
//                         <label htmlFor="location" className="form-label" style={{ color: '#000000' }}>Your Location</label>
//                         <input type="text" id="location" className="form-control" value={location} onChange={handleLocationChange} />
//                         <button className="btn btn-warning mt-2" onClick={handleShowLocation}>View The Location</button>
//                         {error && <div className="alert alert-danger mt-2">Error: {error}</div>}
//                         {nearestGasStation && (
//                             <div className="mt-2">
//                                 <h3>Nearest Gas Station:</h3>
//                                 <p>Name: {nearestGasStation.StationName}</p>
//                                 <p>Distance: {nearestGasStation.distance} km</p>
//                                 <p>Duration: {nearestGasStation.duration} hours</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <div className="row">
//                 <div className="col-md-12">
//                     <div id="map" style={{ width: '100%', height: '600px', marginTop: '50px' }}></div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MapComponent;



//////////////////////////
///////////ال 2 api

// import React, { useState } from 'react';
// import axios from 'axios';
// import MapComponent from './MapComponent';

// const GasStations = () => {
//   const [gasStations, setGasStations] = useState([]);
//   const [nearestGasStation, setNearestGasStation] = useState(null);
//   const [error, setError] = useState('');

//   const getGasStations = async (userLat, userLong) => {
//     try {
//       const response = await axios.get(`/api/v1/stations/nearby?userLong=${userLong}&userLat=${userLat}&minDistance=1&maxDistance=1000000`);
//       setGasStations(response.data);
//       setError(''); // Clear any previous errors
//     } catch (error) {
//       setError('Error fetching gas stations: ' + error.message);
//     }
//   };

//   const pinGasStation = async (stationName, coordinates) => {
//     try {
//       await axios.post('/api/v1/stations/pin-station', {
//         StationName: stationName,
//         coordinates: coordinates,
//       });
//       setNearestGasStation({ StationName: stationName, coordinates: coordinates });
//       setError(''); // Clear any previous errors
//     } catch (error) {
//       setError('Error pinning gas station: ' + error.message);
//     }
//   };

//   const handleLocationClick = () => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userLat = position.coords.latitude;
//         const userLong = position.coords.longitude;
//         getGasStations(userLat, userLong);
//       },
//       (error) => {
//         setError('Error getting user location: ' + error.message);
//       }
//     );
//   };

//   const handlePinStation = (stationName, coordinates) => {
//     setNearestGasStation({ StationName: stationName, coordinates: coordinates });
//     pinGasStation(stationName, coordinates);
//   };

//   return (
//     <div>
//       <button onClick={handleLocationClick}>Find Gas Stations Nearby</button>
//       {error && <div>{error}</div>}
//       {gasStations.length > 0 && (
//         <div>
//           <h3>Gas Stations Nearby:</h3>
//           <ul>
//             {gasStations.map((station) => (
//               <li key={station.id}>
//                 {station.name}{' '}
//                 <button onClick={() => handlePinStation(station.name, station.coordinates)}>Pin Station</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <MapComponent gasStations={gasStations} nearestGasStation={nearestGasStation} />
//     </div>
//   );
// };

// export default GasStations;








////////////////////////
// import React, { useState, useEffect } from 'react';
// import 'ol/ol.css';
// import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import { OSM, Vector } from 'ol/source';
// import { fromLonLat } from 'ol/proj';
// import Feature from 'ol/Feature';
// import Point from 'ol/geom/Point';
// import { Style, Icon } from 'ol/style';
// import axios from 'axios';

// function MapComponent({ apiKey }) {
//     const [location, setLocation] = useState('');
//     const [error, setError] = useState(null);
//     const [map, setMap] = useState(null);
//     const [gasStations, setGasStations] = useState([]);

//     const handleLocationChange = (e) => {
//         setLocation(e.target.value);
//     };

//     const handleShowLocation = async () => {
//         if (map && location) {
//             const coordinates = fromLonLat(location.split(',').map(parseFloat));
//             map.getView().animate({ center: coordinates, zoom: 10 });

//             const marker = new Feature(new Point(coordinates));
//             marker.setStyle(
//                 new Style({
//                     image: new Icon({
//                         src: 'https://openlayers.org/en/latest/examples/data/icon.png',
//                     }),
//                 })
//             );

//             const vectorLayer = new Vector({
//                 source: new Vector({
//                     features: [marker],
//                 }),
//             });

//             map.addLayer(vectorLayer);

//             try {
//                 const response = await axios.get('/api/v1/stations/nearby', {
//                     params: {
//                         location,
//                         radius: 5000,
//                         type: 'gas_station',
//                         key: apiKey,
//                     },
//                 });

//                 setGasStations(response.data.results);

//                 response.data.results.forEach((gasStation) => {
//                     const stationCoordinates = fromLonLat([gasStation.geometry.location.lng, gasStation.geometry.location.lat]);
//                     const stationMarker = new Feature(new Point(stationCoordinates));
//                     stationMarker.setStyle(
//                         new Style({
//                             image: new Icon({
//                                 src: 'https://maps.gstatic.com/mapfiles/place_api/icons/gas_station-71.png',
//                             }),
//                         })
//                     );

//                     vectorLayer.getSource().addFeature(stationMarker);
//                 });
//             } catch (error) {
//                 console.error('Error fetching gas stations:', error);
//             }
//         }
//     }

//     useEffect(() => {
//         const initMap = () => {
//             const initialCoordinates = fromLonLat([0, 0]);
//             const initialView = new View({
//                 center: initialCoordinates,
//                 zoom: 2,
//             });

//             const initialMap = new Map({
//                 target: 'map',
//                 layers: [
//                     new TileLayer({
//                         source: new OSM(),
//                     }),
//                 ],
//                 view: initialView,
//             });

//             return initialMap;
//             // setMap(initialMap);
//         };


//         const map = initMap();
        
 

//         return () => {
//             // Clean up the map when component unmounts
//             map.setTarget(null);
//         };
//     }, []);

//     return (
//         <div className="container" style={{ marginTop: '100px' }}>
//             <div className="row">
//                 <div className="col-md-6 offset-md-3"> {/* Use offset to center the column */}
//                     <div className="text-center"> {/* Center the content */}
//                         <label htmlFor="location" className="form-label" style={{ color: '#000000' }}>Your Location</label>
//                         <input type="text" id="location" className="form-control" value={location} onChange={handleLocationChange} />
//                         <button className="btn btn-warning mt-2" onClick={handleShowLocation}>View The Location</button>
//                         {error && <div className="alert alert-danger mt-2">Error: {error}</div>}
//                         <ul>
//                             {gasStations.map((station, index) => (
//                                 <li key={index}>{station.name}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             <div className="row">
//                 <div className="col-md-12"> {/* Full width column */}
//                     <div id="map" style={{ width: '100%', height: '600px', marginTop: '50px' }}></div> {/* Adjust marginTop as needed */}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default MapComponent;


/////////////////////////
// import React, { useState, useEffect } from 'react';
// import 'ol/ol.css';
// import { Map, View } from 'ol';
// import TileLayer from 'ol/layer/Tile';
// import { OSM, Vector } from 'ol/source';
// import { fromLonLat } from 'ol/proj';
// import Feature from 'ol/Feature';
// import Point from 'ol/geom/Point';
// import { Style, Icon } from 'ol/style';
// import axios from 'axios';
// import GasStations from '../GasStations/GasStations';

// function MapComponent({ apiKey }) {
//     const [location, setLocation] = useState('');
//     const [error, setError] = useState(null);
//     const [map, setMap] = useState(null);


//     const handleLocationChange = (e) => {
//         setLocation(e.target.value);
//     };

//     const handleShowLocation = async () => {
//         if (map && location) {
//             const coordinates = fromLonLat(location.split(',').map(parseFloat));
//             map.getView().animate({ center: coordinates, zoom: 10 });

//             const marker = new Feature(new Point(coordinates));
//             marker.setStyle(
//                 new Style({
//                     image: new Icon({
//                         src: 'https://openlayers.org/en/latest/examples/data/icon.png',
//                     }),
//                 })
//             );

//             const vectorLayer = new Vector({
//                 source: new Vector({
//                     features: [marker],
//                 }),
//             });

//             map.addLayer(vectorLayer);

//             try {
//                 const response = await axios.post('/api/v1/stations/pin-station', {
//                     params: {
//                         location,
//                         radius: 5000,
//                         type: 'gas_station',
//                         key: apiKey,
//                     },
//                 });

//                 response.data.results.forEach((gasStation) => {
//                     const stationCoordinates = fromLonLat([gasStation.geometry.location.lng, gasStation.geometry.location.lat]);
//                     const stationMarker = new Feature(new Point(stationCoordinates));
//                     stationMarker.setStyle(
//                         new Style({
//                             image: new Icon({
//                                 src: 'https://maps.gstatic.com/mapfiles/place_api/icons/gas_station-71.png',
//                             }),
//                         })
//                     );

//                     vectorLayer.getSource().addFeature(stationMarker);
//                 });
//             } catch (error) {
//                 console.error('Error fetching gas stations:', error);
//             }
//         }
//     }




//     useEffect(() => {
//         const initMap = () => {
//             const initialCoordinates = fromLonLat([0, 0]);
//             const initialView = new View({
//                 center: initialCoordinates,
//                 zoom: 2,
//             });

//             const initialMap = new Map({
//                 target: 'map',
//                 layers: [
//                     new TileLayer({
//                         source: new OSM(),
//                     }),
//                 ],
//                 view: initialView,
//             });

//             return initialMap;
//             // setMap(initialMap);
//         };


//         const map = initMap();
        
  

//         return () => {
//             // Clean up the map when component unmounts
//             map.setTarget(null);
//         };
//     }, []);

//    ;
//     return (
//         <div className="container" style={{ marginTop: '100px' }}>
//             <div className="row">
//                 <div className="col-md-6 offset-md-3"> {/* Use offset to center the column */}
//                     <div className="text-center"> {/* Center the content */}
//                         <label htmlFor="location" className="form-label" style={{ color: '#000000' }}>Your Location</label>
//                         <input type="text" id="location" className="form-control" value={location} onChange={handleLocationChange} />
//                         <button className="btn btn-warning mt-2" onClick={handleShowLocation}>View The Location</button>
//                         {error && <div className="alert alert-danger mt-2">Error: {error}</div>}
//                         <GasStations apiKey={apiKey} location={location} />
//                     </div>
//                 </div>
//             </div>
//             <div className="row">
//                 <div className="col-md-12"> {/* Full width column */}
//                     <div id="map" style={{ width: '100%', height: '600px', marginTop: '50px' }}></div> {/* Adjust marginTop as needed */}
//                 </div>
//             </div>
//         </div>
//     );
    
// }

// export default MapComponent;


