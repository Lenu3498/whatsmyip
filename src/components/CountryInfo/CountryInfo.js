import React, { useState, useEffect } from 'react';
import CountryData from 'country-data';
import axios from 'axios';
import { DateTime } from 'luxon';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CountryInfo.css';

export default function CountryInfo({
  country,
  region,
  ipAddress,
  city,
}) {
  const userCountry = CountryData.countries[country].name;
  const [timezone, setTimezone] = useState([]);
  const [language, setLanguage] = useState([]);
  const [flag, setFlag] = useState([]);
  const COUNTRY_API = `https://restcountries.eu/rest/v2/name/${userCountry}`;
  const wikiCountry = `https://en.wikipedia.org/wiki/${userCountry}`;

  // useEffect(() => {
  async function fetchInfo() {
    try {
      axios.get(COUNTRY_API).then((result) => {
        setTimezone(result.data[0].timezones[0]);
        setLanguage(result.data[0].languages[0].name);
        setFlag(result.data[0].flag);
      });
    } catch (error) {
      alert('No results');
    }
  }

  fetchInfo();
  // }, [COUNTRY_API]);

  let localTime = DateTime.now().toLocaleString(
    DateTime.DATETIME_MED,
  );

  return (
    <div className="card">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={flag} />
        <Card.Body>
          <Card.Title>
            <h3>IP: {ipAddress}</h3>
            {city}, {region}, {userCountry}
          </Card.Title>
          <p>official language(s): {language}</p>
          <Card.Text>
            <span>{localTime}</span> <span>{timezone}</span>
          </Card.Text>
          <a href={wikiCountry} target="_blank" rel="noreferrer">
            <Button variant="dark">
              Check {userCountry} on Wikipedia
            </Button>
          </a>
        </Card.Body>
      </Card>
    </div>
  );
}
