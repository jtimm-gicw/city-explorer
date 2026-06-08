import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

class WeatherDay extends React.Component {

  render() {
    console.log('weather day', this.props);

      // BUILD THE WEATHER ICON URL
    // const iconUrl =
    //   `https://www.weatherbit.io/static/img/icons/${this.props.day.icon}.png`;

    return(
      <div className="weather-card-wrapper">
        <Card style={{ width: '18rem' }} className="card">
          <Card.Header>{this.props.day.day}</Card.Header>
            <Card.Title>
              {this.props.day.description}
            </Card.Title>
              <Card.Body> 
            <p>High: {this.props.day.maxTemp}°</p>
            <p>Low: {this.props.day.minTemp}°</p>
          
          
            {/* WEATHER ICON
            <img
              src={iconUrl}
              alt={this.props.day.forecast}
            /> */}
            {/* FORECAST TEXT */}
            {/* <Card.Title>{this.props.day.description}</Card.Title> */}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default WeatherDay;