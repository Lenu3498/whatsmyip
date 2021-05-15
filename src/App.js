import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './components/Map/Map.js';
import CountryInfo from './components/CountryInfo/CountryInfo.js';
import './App.css';

const API_KEY = process.env.REACT_APP_IPFY_API_KEY;
const API_URL = `https://geo.ipify.org/api/v1?apiKey=${API_KEY}`;

const App = () => {
  const [ipAddress, setIpAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lat, setLat] = useState([]);
  const [lng, setLng] = useState([]);
  const [country, setCountry] = useState([]);
  const [region, setRegion] = useState([]);

  useEffect(() => {
    async function fetchIp() {
      setIsLoading(true);

      try {
        axios.get(API_URL).then((result) => {
          console.log(result.data);
          setIpAddress(result.data.ip);
          setLat(result.data.location.lat);
          setLng(result.data.location.lng);
          setCountry(result.data.location.country);
          setRegion(result.data.location.region);
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
        <h1>You are here</h1>
      </header>

      <main>
        {isLoading ? (
          <div className="loading__div">
            <h2>Finding your IP address...</h2>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        ) : (
          <div className="container__all">
            <CountryInfo
              ipAddress={ipAddress}
              country={country}
              region={region}
            />
            <Map lat={lat} lng={lng} />
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2021</p>
      </footer>
    </div>
  );
};

export default App;
