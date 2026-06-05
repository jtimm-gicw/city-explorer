import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

class WeatherDay extends React.Component {

  render() {
    console.log('weather day', this.props);

      // BUILD THE WEATHER ICON URL
    const iconUrl =
      `https://www.weatherbit.io/static/img/icons/${this.props.day.icon}.png`;

    return(
      <div id="weather">
        <Card style={{ width: '18rem' }}>
          <Card.Header>{this.props.day.time}</Card.Header>
          <Card.Body>
            {/* WEATHER ICON */}
            <img
              src={iconUrl}
              alt={this.props.day.forecast}
            />
            {/* FORECAST TEXT */}
            <Card.Title>{this.props.day.forecast}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default WeatherDay;