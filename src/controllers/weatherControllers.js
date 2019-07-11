const axios = require("axios");
import { Zipcode } from '../models/trainModel';

module.exports = {
  forecast: function(req, res) {
    // console.log('WE ARE IN WEATHER FORCAST CONTROLLER');
    // console.log(req.params.zip);
    const zipCode = req.params.zip;
    const URL = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&units=imperial&appid=3bce2d04045dd38cbdadc38a931790ac`;
    
    axios.get(URL)
      .then(response => {
        // console.log(response.data);
        res.send(response.data);
      })
      .catch(err => res.send(err));
  }
};