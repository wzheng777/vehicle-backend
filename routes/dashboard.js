const express = require('express');
const router = express.Router();
const Dashboard = require('../models/Dashboard');

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
    if (!dashboard.isCharging ){
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

// POST /api/dashboard/battery
router.post('/battery', async (req, res) => {
  try {
    const { batteryPercentage, batteryTemperature } = req.body;

    // Validate the input
    if (typeof batteryPercentage !== 'number' || typeof batteryTemperature !== 'number') {
      return res.status(400).json({ message: 'Invalid data types for battery percentage or temperature.' });
    }

    // Find the dashboard document to update (assuming there's only one)
    const dashboard = await Dashboard.findOne();
    if (!dashboard) {
      return res.status(404).json({ message: 'Dashboard data not found.' });
    }

    // Update the battery fields
    dashboard.batteryPercentage = batteryPercentage;
    dashboard.batteryTemperature = batteryTemperature;

    // Save the updated document
    await dashboard.save();

    res.status(200).json({ message: 'Battery information updated successfully.' });
  } catch (error) {
    console.error('Error updating battery information:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
