const axios = require('axios');

const weather = (longitude, latitude, callback) => {
  const params = {
    access_key: 'f4c7a81ddac836ebe5749eab68badb99',
    query: `${latitude},${longitude}`,
  };

  axios
    .get('http://api.weatherstack.com/current', { params })
    .then((response) => {
      const apiResponse = response.data;
      if (apiResponse.error) {
        callback(apiResponse.error, undefined);
      } else {
        callback(undefined, {
          temperature: apiResponse.current.temperature,
          img: apiResponse.current.weather_icons[0],
          location: apiResponse.location.name,
        });
      }
    })
    .catch((error) => {
      callback('Unable connect to weather api', undefined);
    });
};

module.exports = weather;
