const { Sensors } = require('../models');

module.exports = {
  async store(req, res) {
    const store = await Sensors.create(req.body);
    res.json(store);
  },

  async index(req, res) {
    const index = await Sensors.findAll();
    res.json(index);
  },
};