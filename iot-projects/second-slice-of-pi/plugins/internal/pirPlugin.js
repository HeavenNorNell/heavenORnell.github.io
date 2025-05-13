const resources = require('./../../resources/model');
const Gpio = require('onoff').Gpio;

let sensor;
const device = resources.pi.sensors.pir;

function connectHardware() {
    sensor = new Gpio(device.gpio, 'in', 'both');
    sensor.watch(function(error, value){
        if (error){
            device.value = !!value;
            console.log(error);
        }
    });
}

function start(){
    connectHardware();
}

function stop(){
    sensor.unexport();
}

module.exports = {stop, start};