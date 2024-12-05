const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
  motorSpeed: { type: Number, default: 0 },
  batteryPercentage: { type: Number, default: 100 },
  batteryTemperature: { type: Number, default: 25 },
  gearRatio: {type: String, default: "1/4"},
  isCharging: { type: Boolean, default: false },
  motorRPM: { type: Number, default: 0 },
  powerConsumption: { type: Number, default: 0 },
  indicators: {
    parkingBrake: { type: Boolean, default: true },
    checkEngine: { type: Boolean, default: true },
    batteryLow: { type: Boolean, default: true },
    motorStatus: { type: Boolean, default: true },
  },
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
