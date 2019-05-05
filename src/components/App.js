import React, { Component } from 'react';
import Switch from './Switch';
import Form from './Form';
import Weather from './Weather';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      metric: false,
      loading: true,
      data: {
        message: '',
      },
    };
    this.getWeather = this.getWeather.bind(this);
    this.updateCityInput = this.updateCityInput.bind(this);
    this.switchUnit = this.switchUnit.bind(this);
  }
  async componentDidMount() {
    try {
      const res = await fetch('/api/weather');
      const data = await res.json();
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error });
    }
  }
  async getWeather(event) {
    event.preventDefault();
    this.setState({ loading: true });
    try {
      const res = await fetch(`/api/weather/${this.state.city}`);
      const data = await res.json();
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error });
    }
  }
  switchUnit() {
    this.setState(prevState => ({
      metric: !prevState.metric,
    }));
  }
  updateCityInput(event) {
    const city = event.target.value.replace(/\s+/g, '+').toLowerCase();
    this.setState({ city });
  }
  render() {
    const { loading, data, metric } = this.state;
    const { message, weather } = data;
    const unit = metric ? 'C' : 'F';
    return (
      <div className='app'>
        <Switch toggle={this.switchUnit} />
        <Form submit={this.getWeather} change={this.updateCityInput} />
        {loading && <div className='loader' />}
        {!loading && message && <div className='msg'>{message}</div>}
        {!loading &&
          weather && <Weather data={data} unit={unit} metric={metric} />}
      </div>
    );
  }
}
