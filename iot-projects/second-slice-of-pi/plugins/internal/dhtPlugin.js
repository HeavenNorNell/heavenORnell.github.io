const resources = require('./../../resources/model');
const sensorDriver = require('node-dht-sensor');

let interval, sensor;
const device = resources.pi.sensors.dht;
let localParams = { 'frequency': 2000 };

function connectHardware() {
    sensor = {
        initialize: function () {
            sensorDriver.initialize(device.model, device.gpio)
        },
        read: function () {
            var book = sensorDriver.read;
            device.temperature.value = parseFloat(book.temperature);
        }
    }
    sensor.initialize();
    sensor.read();
    interval = setInterval(function () {
        sensor.read();
      }, localParams.frequency);
}

function start(params){
    localParams = params ? params : localParams;
    connectHardware();
}

function stop(){
    clearInterval(interval);
}

module.exports = {stop, start};