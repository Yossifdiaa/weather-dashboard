const { fetchWeatherData, fetchForecastData } = require('../services/weatherService');
const pool = require('../config/db');

const getCurrentWeather = async (req, res) => {
    const { city } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM weather_cache WHERE city_name = ? AND TIMESTAMPDIFF(MINUTE, timestamp, NOW()) < 30', [city]);
        if (rows.length > 0) {
            const cachedData = typeof rows[0].data === 'string' ? JSON.parse(rows[0].data) : rows[0].data;
            return res.json(cachedData);
        }

        const data = await fetchWeatherData(city);

        if (!data || typeof data !== 'object') {
            throw new Error('Invalid API response');
        }

        await pool.query('INSERT INTO weather_cache (city_name, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = ?, timestamp = NOW()', [city, JSON.stringify(data), JSON.stringify(data)]);

        res.json(data);
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                return res.status(404).json({ error: `City ${city} not found.` });
            } else if (error.response.status === 429) {
                return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
            }
        } else if (error.request) {
            return res.status(500).json({ error: 'API connection failed. Please check your network or try again later.' });
        }

        res.status(400).json({ error: error.message });
    }
};

const getWeatherForecast = async (req, res) => {
    const { city } = req.params;
    try {
        const data = await fetchForecastData(city);
        const forecast = data.list.map(item => ({
            date: item.dt_txt.split(' ')[0],
            temp: item.main.temp,
            description: item.weather[0].description,
        }));

        res.json({ city: data.city.name, forecast });
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                return res.status(404).json({ error: `City ${city} not found.` });
            } else if (error.response.status === 429) {
                return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
            }
        } else if (error.request) {
            return res.status(500).json({ error: 'API connection failed. Please check your network or try again later.' });
        }

        res.status(400).json({ error: error.message });
    }
};

module.exports = { getCurrentWeather, getWeatherForecast };
