// https://api.weather.gov/points/{latitude},{longitude}
// In calling the above API, a second API will be returned which needs to be called
// in order to actually retrieve forecast data.

// Base URL for all of the API calls to weather.gov
const API_BASE_URL = 'https://api.weather.gov'

// Service call to get forecast based on latitude and longitude
export const getForecastAPI = async (lat: number, lon: number) => {
  try {
    // Make a call to the first API with the lat and lon
    const coordResponse = await fetch(`${API_BASE_URL}/points/${lat},${lon}`);
    if (!coordResponse.ok) {
      // If it fails, throw an error
      throw new Error(`HTTP error! status: ${coordResponse.status}`);
    }
    // If the API is called successfully, set the data returned from those coordinates
    const coordData = await coordResponse.json();

    // Once the data is returned from the coordinates, grab the URL needed to get the forecast
    const forecastUrl = coordData.properties.forecast;
    // Make a call to the second API with data returned from the first API
    const forecastResponse = await fetch(`${forecastUrl}`);
    if (!forecastResponse.ok) {
      // If it fails, throw an error
      throw new Error(`HTTP error! status: ${forecastResponse.status}`);
    }
    const forecastData = await forecastResponse.json();
    // Return the forecast data to the parent view
    return forecastData;
  } catch (err) {
    // Catch the error state
    console.error('Error getting forecast:', err);
    throw err;
  }
}