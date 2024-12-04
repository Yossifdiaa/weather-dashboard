const express = require('express');
const { getCurrentWeather, getWeatherForecast } = require('../controllers/weatherController');
const router = express.Router();

router.get('/current/:city', getCurrentWeather);
router.get('/forecast/:city', getWeatherForecast);

module.exports = router;
