const { Sensors } = require('../models');

module.exports = {
  async store(req, res) {
    const { location } = req.body;
    const { type } = req.body;
    const { state } = req.body;
    const { value } = req.body;

    Sensors.create({location: location.toUpperCase(), type: type.toUpperCase(),state: state, value: value}).then(resp => {
      return res.json(resp.get({
        plain: true
      }))
    });
  }
};