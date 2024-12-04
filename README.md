# Weather Dashboard API

## Overview
This project provides a backend service that integrates with the OpenWeatherMap API to fetch weather information for a city. The service supports two main endpoints:
1. Current Weather for a city.
2. 5-Day Weather Forecast for a city.

The API is built with Node.js and Express and supports caching to reduce the number of API calls using MySQL.

## Features
- Fetch current weather by city name.
- Fetch 5-day weather forecast by city name.
- Cache weather data for 30 minutes to avoid redundant API calls.
- Error handling for invalid city names, API connection failures, and rate-limiting issues.

## Tech Stack
- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building the API.
- **OpenWeatherMap API**: External weather API used for fetching weather data.
- **MySQL**: Database used for caching weather data.
- **Axios**: Library for making HTTP requests to the OpenWeatherMap API.

## Installation

### 1. Clone the repository

git clone https://github.com/yossifdiaa/weather-dashboard.git
cd weather-dashboard

### 2.  Install dependencies

npm install


### 3. Setup Environment Variables

- Create a .env file in the root directory based on the .env.example file, and set up the following environment variables:

WEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=weather_app

- Replace YOUR_OPENWEATHERMAP_API_KEY with your OpenWeatherMap API key, and configure the MySQL credentials accordingly.


### 4. Start the server

- Once the dependencies are installed and environment variables are set, start the server:

npm run start

- The server will run on http://localhost:3000.



## API Endpoints


### 1. Get Current Weather by City

- Endpoint: GET /api/weather/current/:city
- Description: Fetches the current weather data for the specified city.

### 2. Get 5-Day Weather Forecast

- Endpoint: GET /api/weather/forecast/:city
- Description: Fetches the 5-day weather forecast for the specified city.



## Caching Mechanism

- The weather data is cached in MySQL for 30 minutes to reduce the number of API calls to OpenWeatherMap.
- When a request is made, it first checks the cache. If data for the requested city is found and is less than 30 minutes old, the cached data is returned. Otherwise, a new request is made to the OpenWeatherMap API, and the data is cached for future use.



## Error Handling

- Invalid city name: If the city name is not found, the OpenWeatherMap API will return an error.
- API connection failure: If there is an issue with connecting to the OpenWeatherMap API, a suitable error message is returned.
- Rate-limiting: If the API exceeds the allowed limit of requests, an error message will indicate the issue.

