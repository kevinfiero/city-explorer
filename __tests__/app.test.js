require('dotenv').config();
const request = require('superagent');
const { mungeLocation, mungeWeather, mungeTrails, mungeReviews } = require('../utils.js');
const locationTestData = require('../data/locations.js');
const weatherTestData = require('../data/weather.js');
const trailsTestData = require('../data/trails.js');
const reviewsTestData = require('../data/reviews.js');


describe('app routes', () => {
  describe('routes', () => {

    test('test mungeLocation function', async() => {

      const expectation = locationTestData;

      const location = 'Seattle'

      const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&q=${location}&format=json`;
      const response = await request.get(URL);
      const mungedData = mungeLocation(response.body);

      expect(mungedData).toEqual(expectation);
    });

    test('test mungeWeather function', async() => {

      const expectation = weatherTestData;

      const latitude = '47.6038321'
      const longitude = '-122.3300624'

      const URL = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_KEY}`
      const response = await request.get(URL);
      const mungedData = mungeWeather(response.body);

      expect(mungedData).toEqual(expectation);
    });

    test('test mungeTrails function', async() => {

      const expectation = trailsTestData;

      const latitude = '47.6038321'
      const longitude = '-122.3300624'

      const URL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=200&key=${process.env.HIKING_KEY}`
      const response = await request.get(URL);
      const mungedData = mungeTrails(response.body);

      expect(mungedData).toEqual(expectation);
    });

    test('test mungeReviews function', async() => {

      const expectation = reviewsTestData;

      const latitude = '47.6038321'
      const longitude = '-122.3300624'

      const URL = `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`
      const response = await request.get(URL).set('Authorization', `Bearer ${process.env.YELP_KEY}`);
      const mungedData = mungeReviews(response.body);

      expect(mungedData).toEqual(expectation);
    });


  })
});
