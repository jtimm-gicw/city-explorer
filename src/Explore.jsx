import React from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import CitySearch from './CitySearch';
import LatLon from './LatLon';
import Map from './Map';
import Weather from './Weather';


const storage = {};

const API_KEY = import.meta.env.VITE_MAP_KEY;
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

class Explore extends React.Component {

  constructor(props){

    super(props);

    this.state = {

      displayError: false,

      displayMap: false,

      errorMessage: '',

      latitude: '',

      location: '',

      longitude: '',

      searchQuery: '',

      weather: [],

    };

  }

  updateCity = (e) => {

    this.setState({

      searchQuery: e.target.value

    });

  };

  submitLocation = async () => {

    if(storage[this.state.searchQuery] === undefined){

      console.log('getting location from API');

      const url =
        `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${this.state.searchQuery}&format=json`;

      console.log('SEARCH QUERY:', this.state.searchQuery);
      console.log('API KEY:', API_KEY);
      console.log('URL:', url);

      let location;

      try {

        location = await axios.get(url);

        console.log('successfully got location', { location });

        this.setState({

          location: location.data[0].display_name,

          latitude: location.data[0].lat,

          longitude: location.data[0].lon,

          displayMap: true,

          displayError: false

        }, () => {

          this.getWeather();

        });

        storage[this.state.searchQuery] = location.data[0];

      } catch(error) {

        console.log('FULL ERROR:', error);

        if(error.response){

          console.log('STATUS:', error.response.status);

          console.log('DATA:', error.response.data);

        }

        this.setState({

          displayMap: false,

          displayError: true,

          errorMessage:
            error.response
              ? `Error ${error.response.status}: Something went wrong`
              : 'Network Error'

        });

      }

    } else {

      console.log('getting location information from storage');

      this.setState({
        location: storage[this.state.searchQuery].display_name,
        latitude: storage[this.state.searchQuery].lat,
        longitude: storage[this.state.searchQuery].lon,
        displayMap: true,
        displayError: false

      }, () => {
        this.getWeather();
      });

    }

  };

  getWeather = async () => {
    try {
      const weather = await axios.get(
        `${SERVER_URL}/weather`,
        {
          params: {
            lat: this.state.latitude,
            lon: this.state.longitude
          }
        }
      );

      this.setState({
        weather: weather.data
      });

    } catch(error){
      console.log('weather error', error);

      this.setState({
        displayMap: false,
        displayError: true,
        errorMessage:
          error.response
            ? `Error ${error.response.status}: Weather request failed`
            : 'Network Error'
      });
    }

  };

  render() {
    return(
      <Container fluid className="main-container">
        {/* SEARCH BAR */}
        <Row className="mb-4">
          <Col>
            <CitySearch
              updateCity={this.updateCity}
              submitLocation={this.submitLocation}
              hasError={this.state.displayError}
              errorMessage={this.state.errorMessage}
            />
          </Col>
        </Row>
        {this.state.displayMap &&
          <>
            {/* LAT / LON INFO */}
            <Row className="mb-4">
              <Col>
                <LatLon
                  city={this.state.location}
                  query={this.state.searchQuery}
                  lat={this.state.latitude}
                  lon={this.state.longitude}
                />
              </Col>
            </Row>

            {/* MAP */}
            <Row className="map-row">
              <Col>
                <Map
                  img_url={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${this.state.latitude},${this.state.longitude}&size=${window.innerWidth}x300&format=jpg&zoom=12`}
                  city={this.state.location}
                />
              </Col>
            </Row>

            {/* WEATHER SECTION */}
            <Row className="weather-section">
              <Col>
                <Weather
                  weather={this.state.weather}
                />
              </Col>
            </Row>
          </>
        }
      </Container>

    );

  }

}

export default Explore;