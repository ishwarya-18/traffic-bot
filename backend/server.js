// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const ORS_API_KEY = process.env.ORS_API_KEY;

// Helper to get coordinates using OpenRouteService geocoding
async function getCoordinates(cityName) {
  if (!cityName) throw new Error('City name is required');

  const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(cityName)}&size=1`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('ORS Geocoding request failed');

  const data = await response.json();
  console.log(`ORS Geocoding response for ${cityName}:`, JSON.stringify(data, null, 2));

  if (!data.features || data.features.length === 0) {
    throw new Error(`City not found: ${cityName}`);
  }

  const [lng, lat] = data.features[0].geometry.coordinates;
  return { lat, lng };
}

// Route to calculate distance & duration
app.post('/route', async (req, res) => {
  try {
    const { origin, destination } = req.body;
    if (!origin || !destination) throw new Error('Origin and destination required');

    const originCoords = await getCoordinates(origin);
    const destinationCoords = await getCoordinates(destination);

    console.log('Origin coords:', originCoords);
    console.log('Destination coords:', destinationCoords);

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${originCoords.lng},${originCoords.lat}&end=${destinationCoords.lng},${destinationCoords.lat}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('ORS Directions request failed');

    // inside /route POST handler
const data = await response.json();
console.log('ORS response:', JSON.stringify(data, null, 2));

// Check if coordinates exist in features
if (!data.features || data.features.length === 0 || !data.features[0].geometry?.coordinates) {
  throw new Error('No route found between the given cities');
}

// Extract distance and duration from metadata if available
const summary = data.features[0].properties?.summary;
if (!summary) {
  throw new Error('Route found, but summary not available');
}

res.json({
  origin,
  destination,
  distance: summary.distance, // meters
  duration: summary.duration  // seconds
});

  } catch (err) {
    console.error('Error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Traffic bot backend running on port ${PORT}!`);
});
