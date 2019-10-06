const { Sensors } = require('../models');

module.exports = {
  async show(req, res) {
    const { location } = req.body;
    const { type } = req.body;
    const { state } = req.body;
    const { value } = req.body;

    Sensors.create({location: location, type: type,state: state, value: value}).then(resp => {
      return res.json(resp.get({
        plain: true
      }))
    });
  }
};