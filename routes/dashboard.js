const express = require('express');
const router = express.Router();
const Dashboard = require('../models/Dashboard');

// Function to simulate battery percentage
const simulateBatteryPercentage = async () => {
  try {
    const dashboard = await Dashboard.findOne();
    if (dashboard) {
      if (!dashboard.isCharging) {
        dashboard.batteryPercentage = Math.min(dashboard.batteryPercentage + 1, 100); // Increase while charging
      } else if (dashboard.motorSpeed > 0) {
        dashboard.batteryPercentage = Math.max(dashboard.batteryPercentage - 1, 0); // Decrease when motor is in use
      }
      await dashboard.save();
    }
  } catch (error) {
    console.error('Error simulating battery percentage:', error);
  }
};

// Function to simulate battery temperature
const simulateBatteryTemperature = async () => {
  try {
    const dashboard = await Dashboard.findOne();
    if (dashboard) {
      dashboard.batteryTemperature = Math.min(20 + dashboard.motorSpeed * 5, 100); // Increase temperature based on motor speed
      await dashboard.save();
    }
  } catch (error) {
    console.error('Error simulating battery temperature:', error);
  }
};

// Run battery simulation periodically
setInterval(simulateBatteryPercentage, 1000); // Run every 1 seconds
setInterval(simulateBatteryTemperature, 1000); // Run every 1 seconds

// GET - Get Dashboard Data
router.get('/', async (req, res) => {
  try {
    const dashboardData = await Dashboard.findOne();
    if (!dashboardData) {
      return res.status(404).json({ message: 'Dashboard data not found.' });
    }
    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

// POST - Update Motor Speed
router.post('/motor-speed', async (req, res) => {
  const { speed } = req.body;
  try {
    const dashboard = await Dashboard.findOne();
    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard data not found.' });
    }
    dashboard.motorSpeed = speed;
    dashboard.motorRPM = speed * 200; // Simple calculation to derive RPM from speed
    dashboard.powerConsumption = speed * 25;
    await dashboard.save();
    res.json({ message: 'Motor speed updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating motor speed' });
  }
});

// POST - Toggle Charging State
router.post('/charging', async (req, res) => {
  const { charging } = req.body;
  try {
    const dashboard = await Dashboard.findOne();
    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard data not found.' });
    }
    dashboard.isCharging = charging;
    dashboard.motorSpeed = 0; // Disable motor when charging
    dashboard.motorRPM = 0;
    if (!dashboard.isCharging) {
      dashboard.powerConsumption = -90;
    } else {
      dashboard.powerConsumption = 0;
    }
    await dashboard.save();
    res.json({ message: 'Charging state updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating charging state' });
  }
});

module.exports = router;

