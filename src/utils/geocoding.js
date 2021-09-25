const axios = require('axios');

const geocode = (address, callack) => {
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=pk.eyJ1IjoidHJhbmNoaWVuY29uZ3RkIiwiYSI6ImNrdHNwODY4eTFpZ20ydmw0cjM4aWxsMjcifQ.kjlZxJD-gO4Mt-S4YBGgFg`
    )
    .then((response) => {
      const apiResponse = response.data;
      if (apiResponse.features.length === 0) {
        callack('Cannot find your location!', undefined);
      } else {
        const longitude = apiResponse.features[0].center[0];
        const latitude = apiResponse.features[0].center[1];
        const location = apiResponse.features[0].place_name;
        callack(undefined, { longitude, latitude, location });
      }
    })
    .catch((error) => {
      callack(error, undefined);
    });
};

module.exports = geocode;
