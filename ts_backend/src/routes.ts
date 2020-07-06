import express from 'express'

import SensorsController from '@controllers/SensorControlle'

const routes = express.Router()

const sensorController = new SensorsController()

routes.get('/api/sensors', sensorController.index)

export default routes
