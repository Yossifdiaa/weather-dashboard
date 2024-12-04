require('dotenv').config();
module.exports = {
    weatherApiKey: process.env.WEATHER_API_KEY,
    dbConfig: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
};
