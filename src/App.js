import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ip from './components/Ip/Ip.js';
import Map from './components/Map/Map.js';
import './App.css';

const API_KEY = process.env.REACT_APP_IPFY_API_KEY;
const API_URL = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}`;
console.log(API_KEY);

const App = () => {
  const [ipAddress, setIpAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lat, setLat] = useState([]);
  const [lng, setLng] = useState([]);

  useEffect(() => {
    async function fetchIp() {
      setIsLoading(true);

      try {
        axios.get(API_URL).then((result) => {
          setIpAddress(result.data.ip);
          setLat(result.data.location.lat);
          setLng(result.data.location.lng);
          setIsLoading(false);
        });
      } catch (error) {
        alert('No results');
      }
    }

    fetchIp();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Your IP is</h1>
      </header>

      <main>
        {isLoading ? (
          <div>
            <h2>Finding your IP address...</h2>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        ) : (
          <div>
            <Ip ipAddress={ipAddress} />
            <Map lat={lat} lng={lng} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
