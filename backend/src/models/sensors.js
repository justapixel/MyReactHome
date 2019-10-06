'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sensors = sequelize.define('Sensors', {
    location: DataTypes.STRING,
    type: DataTypes.STRING,
    state: DataTypes.STRING,
    value: DataTypes.STRING
  }, {});
  Sensors.associate = function(models) {
    // associations can be defined here
  };
  return Sensors;
};