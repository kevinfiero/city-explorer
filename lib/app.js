require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { mungeMovie, mungeLocation, mungeWeather } = require('../utils.js');
const request = require('superagent');
const app = express();

app.use(cors());

/*
must respond with an object with this shape:
{
    description,
    name,
    genre1,
    genre2,
    dir_name
}
*/
app.get('/', async(req, res) => {
    try {
        const URL = `https://api.themoviedb.org/3/movie/${req.query.movie}?api_key=${process.env.MOVIE_KEY}`;
        const response = await request.get(URL);
    
        const newResponse = mungeMovie(response.body);

        res.json(newResponse);
    } catch (e) {
        res.json({ error: e.message });
    }
});

app.get('/location', async(req, res) => {
  try {
      const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${req.query.search}&format=json`;
      const response = await request.get(URL);
      const newResponse = mungeLocation(response.body);

      res.json(newResponse);
  } catch (e) {
      res.json({ error: e.message });
  }
});

app.get('/weather', async(req, res) => {
  try {
      const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_KEY}`
      const response = await request.get(URL);
      const newResponse = mungeWeather(response.body);

      res.json(newResponse);
  } catch (e) {
      res.json({ error: e.message });
  }
});

module.exports = app;