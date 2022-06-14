let express = require('express');
let router = express.Router();
let axios = require('axios').default;
let db = require('../models/index')
require('dotenv').config()

router.get('/', async (req, res, next) => {

  var dataToLog = {};
  // async call the API with the key - process.env.MAPS_API_KEY
  try {
    let requestURL = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=Goleta&destinations=Ventura&key=";
    const response = await axios.get(requestURL + process.env.MAPS_API_KEY);

    dataToLog = {
      timeStamp: Date.now(),
      durationInSeconds: response.data.rows[0].elements[0].duration.value,
      from: response.data.origin_addresses[0],
      to: response.data.destination_addresses[0],
    }

  } catch (error) {
    console.error(error);
  }

  // after the response, write to the DB

  const addNewDataRow =
    `INSERT INTO "DataObjects" 
("to", "from", "durationInSeconds", "timeStamp") 
VALUES (:to, :from, :durationInSeconds, :timeStamp)
RETURNING *;`

  await db.sequelize.query(addNewDataRow, {
    replacements: { ...dataToLog, createdAt: new Date() },
    type: db.sequelize.QueryTypes.INSERT
  });

  res.sendStatus(200);
});

module.exports = router;
