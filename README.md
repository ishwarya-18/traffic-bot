# Traffic Bot

Traffic Bot is a full-stack application that helps users calculate routes between cities using the OpenRouteService API. It provides distance and estimated travel time for driving routes.

## Features

* Enter origin and destination cities.
* Fetch distance (in km) and duration (in minutes).
* Backend built with Node.js & Express.
* Frontend built with React Native.
* Handles errors if cities are not found or route is unavailable.

## Tech Stack

* **Backend:** Node.js, Express, Node-Fetch
* **Frontend:** React Native
* **API:** OpenRouteService (ORS)
* **Other:** CORS, dotenv

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/traffic-bot.git
   cd traffic-bot
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in backend folder with your ORS API key:

   ```
   ORS_API_KEY=your_openrouteservice_api_key
   PORT=3000
   ```

5. Run backend:

   ```bash
   cd ../backend
   node server.js
   ```

6. Run React Native app:

   ```bash
   cd ../frontend
   npx react-native run-android   # or run-ios
   ```

## Usage

* Open the app on your device/emulator.
* Enter origin and destination cities.
* Press **Get Route** to see distance and estimated travel time.

## License

MIT
