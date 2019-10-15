'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sensors = sequelize.define('Sensors', {
    location: {
      type: DataTypes.STRING,
      set: function(val) {
        this.setDataValue('location', val.toUpperCase());
      }
    },
    type: {
      type: DataTypes.STRING,
      set: function(val) {
        this.setDataValue('type', val.toUpperCase());
      }
    },
    state: DataTypes.STRING,
    value: DataTypes.STRING
  }, {});
  Sensors.associate = function(models) {
    // associations can be defined here
  };
  return Sensors;
};