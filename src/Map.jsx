import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pin from './Pin';
import MarkerClusterGroup from 'react-leaflet-cluster';




function Map() {

  const [allPins, setAllPins] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/messages`)
      .then((response) => {
        setAllPins(response.data);
        console.log('Pins fetched:', response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])


  return (
    <MapContainer center={[40, 0]} zoom={1.5} scrollWheelZoom={true} minZoom={1.5}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url='https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png'
      />
      
        <MarkerClusterGroup>
        { allPins && (allPins.map((pin) => {
          return (

            <Marker key={pin.id} position={[pin.location.lat, pin.location.lng]}>
              <Popup className='custom-popup'>
                
                <Pin pin={pin}></Pin>
                
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