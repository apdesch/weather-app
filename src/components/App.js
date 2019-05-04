import React, { useState } from 'react';
import Switch from './Switch';
import Form from './Form';
import Weather from './Weather';
import useFetch from '../hooks/useFetch';

const App = () => {
  const [city, setCity] = useState('');
  const [metric, setMetric] = useState(false);
  const { data, loading, error } = useFetch('api/weather/', city);
  const { message, weather } = data;
  const unit = metric ? 'C' : 'F';

  const switchUnit = () => setMetric(prevUnit => !prevUnit);

  const updateCity = (event) => {
    event.preventDefault();
    const { value } = event.target.firstChild;
    const city = value.replace(/\s+/g, '+').toLowerCase();
    setCity(city);
  };

  return (
    <div className='app'>
      <Switch toggle={switchUnit} />
      <Form submit={updateCity} />
      {loading && <div className='loader' />}
      {!loading && error && <div className='msg'>{error}</div>}
      {!loading && message && !error && <div className='msg'>{message}</div>}
      {!loading && !error &&
        weather && <Weather data={data} unit={unit} metric={metric} />}
    </div>
  );
}

export default App;
