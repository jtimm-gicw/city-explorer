import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import WeatherDay from './WeatherDay';


class Weather extends React.Component {
  render() {
    console.log('WEATHER PROPS:', this.props.weather);

    return(
      <div id="weather">
        <h2>5-Day Forecast</h2>
        <Container>
          <h3>Weather</h3>
            <div className="weather-container">
              {this.props.weather.map((day, index) => (
            <WeatherDay key={index} day={day} />
              ))}
            </div>
        </Container>
      </div>
    );
  }
}


// function Weather(props) {

//   return (
//     <section>
//       <h2>Weather</h2>
//       {props.weather.map((day, index) => (
//         <div key={index}>
//           <p>day: {day.date}</p>
//           <p>description: {day.description}</p>
//         </div>
//       ))}
//     </section>
//   );
// }


export default Weather;
