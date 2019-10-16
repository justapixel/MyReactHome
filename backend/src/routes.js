const express = require('express');

const RoomsController = require('./controllers/RoomsController');
const SensorsController = require('./controllers/SensorsController');

const routes = express.Router();

routes.post('/sensor', SensorsController.store);
routes.get('/sensor', SensorsController.index);
routes.get('/sensor/my', SensorsController.indexone);
routes.post('/sensor/update', SensorsController.update);

module.exports = routes;