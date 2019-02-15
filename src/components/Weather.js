import React from 'react';
import PropTypes from 'prop-types';

const convertTemp = (temp, metric) => {
  const calc = !metric
    ? (temp - 273.15) * 1.8 + 32
    : temp - 273.15;
  return Math.round(calc);
}

const Weather = ({ data, unit, metric }) => (
  <div className='weather'>
    <h2 className='city'>{data.name}</h2>
    <span className='desc'>{data.weather[0].description}</span>
    <i className={`icon wi wi-fw wi-owm-${data.weather[0].id}`} />
    <h4 className='temp'>
      {convertTemp(data.main.temp, metric)}
      &deg;
      {unit}
    </h4>
  </div>
);

Weather.propTypes = {
  data: PropTypes.shape(),
  unit: PropTypes.string.isRequired,
  metric: PropTypes.bool,
}

export default Weather;
