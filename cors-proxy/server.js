const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Proxy endpoint
app.use((req, res) => {
  const url = `https://bible-api.com${req.url}`;
  req.pipe(request(url)).pipe(res);
});

app.listen(port, () => {
  console.log(`CORS proxy server is running on http://localhost:${port}`);
});
