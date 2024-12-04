const axios = require('axios');
const { weatherApiKey } = require('../config/config');

const fetchWeatherData = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Weather API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'API error');
    }
};

const fetchForecastData = async (city) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'API error');
    }
};

module.exports = { fetchWeatherData, fetchForecastData };
