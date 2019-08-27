const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

// CODELAB: Change this to add a delay (ms) before the server responds.
const FORECAST_DELAY = 0;

// CODELAB: If running locally, set your Dark Sky API key here
const API_KEY = process.env.DARKSKY_API_KEY;
const BASE_URL = `https://api.darksky.net/forecast`;


/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */
function startServer() {
  const app = express();

  // Logging for each request
  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const path = `"${req.method} ${req.path}"`;
    const m = `${req.ip} - ${time} - ${path}`;
    // eslint-disable-next-line no-console
    console.log(m);
    next();
  });

  // Handle requests for static files
  app.use(express.static('public'));

  // Start the server
  return app.listen('8000', '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log('Local DevServer Started on port 8000...');
  });
}

startServer();
