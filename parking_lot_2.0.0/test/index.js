require('mocha');
require('chai');

// Class tests
require('./classes/car.test')();
require('./classes/lot.test')();
require('./classes/parkingLot.test')();
require('./classes/command.test')();

// Helpers test
require('./helpers/fileHandler.test')();