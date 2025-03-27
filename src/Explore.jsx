import { useState } from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import CitySearch from './CitySearch';
import axios from 'axios';
import LatLon from './LatLon';
import Map from './Map';
import Weather from './Weather';

const API_KEY = import.meta.env.VITE_API_KEY;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function Explore() {

  const [displayError, setDisplayError] = useState(false);
  const [displayMap, setDisplayMap] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [latitude, setLatitude] = useState('');
  const [location, setLocation] = useState('');
  const [longitude, setLongitude] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [weather, setWeather] = useState([]);

  const updateCity = (e) => {
    setSearchQuery(e.target.value);
  };

  const displayLocation = async () => {
    const url = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;

    let location;
    try {
      location = await axios.get(url);

      setLocation(location.data[0].display_name);
      setLatitude(location.data[0].lat);
      setLongitude(location.data[0].lon);
      setDisplayMap(true);
      setDisplayError(false);
    } catch (error) {
      setDisplayMap(false);
      setDisplayError(true);
      setErrorMessage(error.response.status + ': ' + error.response.data.error);
    }

    displayWeather(location.data[0].lat, location.data[0].lon);
  };

  const displayWeather = async (lat, lon) => {
    try {
      const weather = await axios.get(`${SERVER_URL}/weather`, { params: { latitude: lat, longitude: lon, searchQuery: searchQuery } });
      setWeather(weather.data);
    } catch (error) {
      setDisplayMap(false);
      setDisplayError(true);
      setErrorMessage(error.response.status + ': ' + error.response.data.error);
    }
  };


  return (
    <Container fluid>
      <Row>
        <Col>
          <CitySearch
            updateCity={updateCity}
            displayLocation={displayLocation}
            hasError={displayError}
            errorMessage={errorMessage}
          />
        </Col>
      </Row>
      {displayMap &&
        <>
          <Row>
            <Col>
              <LatLon
                city={location}
                lat={latitude}
                lon={longitude}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Map
                img_url={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${latitude},${longitude}&size=${window.innerWidth}x300&format=jpg&zoom=12`}
                city={location}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Weather
                weather={weather}
              />
            </Col>
          </Row>
        </>
      }
    </Container>
  );
}

export default Explore;
