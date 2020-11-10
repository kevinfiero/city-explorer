require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { mungeLocation, mungeWeather, mungeTrails, mungeReviews } = require('../utils.js');
const request = require('superagent');
const app = express();

app.use(cors());

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
      const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.latitude}&lon=${req.query.longitude}&key=${process.env.WEATHER_KEY}`
      const response = await request.get(URL);
      const newResponse = mungeWeather(response.body);

      res.json(newResponse);
  } catch (e) {
      res.json({ error: e.message });
  }
});

app.get('/trails', async(req, res) => {
  try {
      const URL = `https://www.hikingproject.com/data/get-trails?lat=${req.query.latitude}&lon=${req.query.longitude}&maxDistance=200&key=${process.env.HIKING_KEY}`
      const response = await request.get(URL);
      const newResponse = mungeTrails(response.body);

      res.json(newResponse);
  } catch (e) {
      res.json({ error: e.message });
  }
});

app.get('/reviews', async(req, res) => {
  try {
      const URL = `https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}`
      console.log(URL);
      const response = await request.get(URL).set('Authorization', `Bearer ${process.env.YELP_KEY}`);
      const newResponse = mungeReviews(response.body);

      res.json(newResponse);
  } catch (e) {
      res.json({ error: e.message });
  }
});

module.exports = app;