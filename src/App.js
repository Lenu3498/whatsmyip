import React, { useState, useEffect } from "react";
import axios from "axios";
import Ip from "./components/Ip/Ip.js";
import Map from "./components/Map/Map.js";
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
        console.log(result.data)
        const userIp = result.data.ip;
        const userLng = result.data.location.lng;
        const userLat = result.data.location.lat;
        setIpAddress(userIp);
        setLat(result.data.location.lat);
        console.log(lat)
        setLng(result.data.location.lng);
        console.log(lng);
        setIsLoading(false);
        console.log(userLng);
        console.log(userLat);
      });
    } catch (error) {
      alert("No results");
    }
  }

  fetchIp();

},[lng, lat, ipAddress]);


return (
  <div className="App">

    <h1>
      Your IP
    </h1>

    <Ip ipAddress={ipAddress}  />
    <Map lat={lat} lng={lng} />



  </div>
);
};

export default App;