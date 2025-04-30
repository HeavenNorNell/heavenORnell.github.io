var sensorRoutes = require('./../routes/sensors');
var actuatorRoutes = require('./../routes/actuators');
const express = require('express'),
	cors = require('cors');
var app = express();
app.use(cors());
app.use('/pi/sensors', sensorRoutes);
app.use('/pi/actuators', actuatorRoutes);

app.get("/", function (req, res) {
	res.send("Welcome to the root! Climb the tree?");
});

app.get("/pie", function (req, res) {
	res.send("Welcome to the gate! Enter the garden?");
});

module.exports = app;
// I have looked through all the files