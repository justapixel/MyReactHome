const express = require('express');

const RoomsController = require('./controllers/RoomsController');
const SensorsController = require('./controllers/SensorsController');
const StateController = require('./controllers/StateController');

const routes = express.Router();

routes.post('/room', RoomsController.store);
routes.post('/sensor', SensorsController.store);
routes.get('/sensor', SensorsController.index);
routes.get('/state', StateController.show);

module.exports = routes;