import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import WeatherDay from './WeatherDay';

class Weather extends React.Component {
  render() {
    return(
      <div id="weather">
        <Container style={{ width: '18rem' }}>
          <h3>Weather:</h3>
          {this.props.weather.map((day, idx) => (
            <WeatherDay
              key={idx}
              day={day}
            />
          ))
          }
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
