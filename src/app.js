const express = require('express');
const path = require('path');
const weather = require('./utils/weatherstack');
const geocode = require('./utils/geocoding');

// -----------------
const app = express();
const port = process.env.PORT || 3000;

// Static file on your app
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'resources', 'views'));
app.set('view engine', 'ejs');

//Routers
app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: 'You need a address to search' });
  }

  geocode(address, (error, geoData) => {
    if (error) {
      return res.send({ error });
    }

    weather(geoData.longitude, geoData.latitude, (error, weatherData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        location: weatherData.location,
        temperture: weatherData.temperature,
        address,
        imgUrl: weatherData.img,
      });
    });
  });
});
// Run server
app.listen(port, () => {
  console.log(`App listening at PORT: http://localhost:${port}`);
});
