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

  async update(req, res) {
    const update = await Sensors.update(
      {state: req.body.state},
      {where: {id: req.body.id}}
    )
    res.json(update);
  },

  async indexone(req, res) {
    const { id } = req.query;

    const indexone = await Sensors.findByPk(id);

    return res.json(indexone);
  }
};