
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '9d8377900171227c3199aa8669503ede';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        let icon = weather.weather[0].icon;
        let urlIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`
        let description = weather.weather[0].description;
        res.render('index', {weather: weatherText, error: null, icon : urlIcon , description : description});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})