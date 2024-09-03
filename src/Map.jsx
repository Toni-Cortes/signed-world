import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pin from './Pin';
import MarkerClusterGroup from 'react-leaflet-cluster';




function Map() {

  const [allPins, setAllPins] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}messages`)
      .then((response) => {
        setAllPins(response.data);
        console.log('Pins fetched:', response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  const bounds = [
    [-90, -180], // Southwest corner (latitude, longitude)
    [90, 180],   // Northeast corner (latitude, longitude)
  ];

  return (
    <MapContainer center={[45, 0]} zoom={2.5} scrollWheelZoom={true} minZoom={3} maxBounds={bounds}>
      
      
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url='https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
        
    
        bounds={bounds}              // Ensures tiles are loaded only within these bounds
      
      />
      
        <MarkerClusterGroup>
        { allPins && (allPins.map((pin) => {
          return (

            <Marker key={pin.id} position={[pin.location.lat, pin.location.lng]}>
              <Popup className='custom-popup'>
                
                <Pin pin={pin}></Pin>
                {/* <form action=""><label htmlFor=""><input type="text" /></label></form> */}
                
              </Popup>
            </Marker>
          )
        })
      )
    }
    </MarkerClusterGroup>
      
    </MapContainer>
  )
}

export default Map