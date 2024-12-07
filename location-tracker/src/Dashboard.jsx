import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';

const Dashboard = ({ user, onLogout }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, [user]);

  const fetchLocations = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching locations:', error.message);
    } else {
      setLocations(data);
    }
  };

  const fetchLocationAndSave = async () => {
    if (!user) {
      console.error('User not logged in!');
      return;
    }

    if (navigator.geolocation) {
      console.log('Fetching geolocation...');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          console.log('Position obtained:', { latitude, longitude });

          const { data, error } = await supabase.from('locations').insert([
            {
              user_id: user.id,
              latitude,
              longitude,
              timestamp: new Date().toISOString(),
            },
          ]);

          if (error) {
            console.error('Error inserting data into Supabase:', error.message);
          } else {
            console.log('Location inserted successfully:', data);
            fetchLocations(); // Refresh location history after saving
          }
        },
        (error) => {
          console.error('Error fetching location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <button onClick={fetchLocationAndSave}>Track My Location</button>
      <button onClick={onLogout} style={{ marginLeft: '10px' }}>Log Out</button>
      <h2>Location History</h2>
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.latitude}, {location.longitude} at{' '}
            {new Date(location.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
