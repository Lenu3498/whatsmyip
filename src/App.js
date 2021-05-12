import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ip from './components/Ip/Ip.js';
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

  useEffect(() => {
    async function fetchIp() {
      setIsLoading(true);

      try {
        axios.get(API_URL).then((result) => {
          setIpAddress(result.data.ip);
          setLat(result.data.location.lat);
          setLng(result.data.location.lng);
          setCountry(result.data.location.country);
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
          <div>
            <h2>Finding your IP address...</h2>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          </div>
        ) : (
          <div>
            <div className="container__all">
              <Ip ipAddress={ipAddress} />

              <CountryInfo country={country} />
            </div>

            <div className="container__map">
              <Map lat={lat} lng={lng} />
            </div>
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
