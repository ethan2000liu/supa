import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import supabase from './supabaseClient';

// Fix default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({ user }) => {
  const [pins, setPins] = useState([]);
  const [newPinName, setNewPinName] = useState('');

  useEffect(() => {
    fetchPins();
  }, [user]);

  const fetchPins = async () => {
    const { data, error } = await supabase
      .from('pins')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching pins:', error.message);
    } else {
      setPins(data);
    }
  };

  const savePin = async (latitude, longitude) => {
    const { data, error } = await supabase.from('pins').insert([
      {
        user_id: user.id,
        name: newPinName,
        latitude,
        longitude,
      },
    ]);

    if (error) {
      console.error('Error saving pin:', error.message);
    } else {
      console.log('Pin saved:', data);
      setPins((prevPins) => [...prevPins, data[0]]);
    }
  };

  const AddMarker = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        const pinName = prompt('Enter a name for this pin:');
        if (pinName) {
          setNewPinName(pinName);
          savePin(lat, lng);
        }
      },
    });
    return null;
  };

  return (
    <div>
      <h1>Interactive Map</h1>
      <MapContainer
        center={[51.505, -0.09]} // Default center coordinates
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <AddMarker />
        {pins.map((pin) => (
          <Marker key={pin.id} position={[pin.latitude, pin.longitude]}>
            <Popup>{pin.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
