import React, { useState, useEffect } from 'react';
import CountryData from 'country-data';
import axios from 'axios';
import { DateTime } from 'luxon';
import Card from 'react-bootstrap/card';
import Button from 'react-bootstrap/button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CountryInfo.css';

export default function CountryInfo({ country }) {
  const userCountry = CountryData.countries[country].name;
  //const [timezone, setTimezone] = useState([]);
  const [language, setLanguage] = useState([]);
  const [flag, setFlag] = useState([]);
  const COUNTRY_API = `https://restcountries.eu/rest/v2/name/${userCountry}`;

  useEffect(() => {
    async function fetchInfo() {
      try {
        axios.get(COUNTRY_API).then((result) => {
          //setTimezone(result.data[0].timezones);
          setLanguage(result.data[0].languages[0].name);
          // console.log(result.data[0].languages[0].name);
          setFlag(result.data[0].flag);
        });
      } catch (error) {
        alert('No results');
      }
    }

    fetchInfo();
  },[]);

  let localTime = DateTime.now().toLocaleString(
    DateTime.DATETIME_MED,
  );

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={flag} />
      <Card.Body>
        <Card.Title>{userCountry}</Card.Title>
        <p>official language(s): {language}</p>
        <Card.Text>local date and time:{localTime}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
