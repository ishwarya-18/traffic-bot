# Traffic Bot

A Traffic Assistance app to calculate driving routes, distances, and durations between two cities using OpenRouteService (ORS) API.

## Features
- Backend API with Node.js & Express for calculating routes.
- React Native mobile app (Expo) to input origin and destination.
- Returns distance (in km) and duration (in minutes).

## Technologies Used
- Backend: Node.js, Express, CORS, node-fetch, dotenv
- Mobile App: React Native, Expo
- API: OpenRouteService (ORS)

## Setup Instructions

### Backend
1. Navigate to backend folder:
   cd backend
2. Install dependencies:
   npm install
3. Create a `.env` file with:
   PORT=3000
   ORS_API_KEY=your_openrouteservice_api_key
4. Start the server:
   node server.js

### Mobile App
1. Navigate to mobile app folder:
   cd mobile-app-new
2. Install dependencies:
   npm install
3. Start Expo:
   npx expo start
4. Make sure the backend server is running and update the IP in `fetch` URL inside `HomeScreen.js`.

## Notes
- Backend must be running for the mobile app to fetch routes.
- Node.js version 18 is recommended for Expo SDK 46+.
