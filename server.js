/* eslint-disable no-console */
const fetch = require('node-fetch');
const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const history = require('connect-history-api-fallback');
const config = require('./webpack.config');

const PORT = process.env.PORT || 8000;
const app = express();
const compiler = webpack(config);
const instance = middleware(compiler);

require('dotenv').config();

console.log('Dogma', process.env.OWM_API_KEY);

app
  .get('/api/weather', (req, res) => {
    fetch('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22')
      .then(r => r.json())
      .then(data => res.json(data))
      .catch(error => res.json({ error }));
  })
  .get('/api/weather/:city', (req, res) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${process.env.OWM_API_KEY || ''}`)
      .then(r => r.json())
      .then(data => res.json(data))
      .catch(error => res.json({ error }));
  })
  .use(instance)
  .use(require('webpack-hot-middleware')(compiler))
  .use(history())
  .use(instance)
  .listen(PORT, () => console.log(`Server is ready on http://localhost:${PORT}`));

