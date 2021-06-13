require('mocha');
require('chai');
const sinon = require('sinon').createSandbox(); 

afterEach('reset stub', cb => {
  sinon.restore()
  cb()
});

// Class tests
require('./classes/car.test')();
require('./classes/lot.test')();
require('./classes/parkingLot.test')();
require('./classes/command.test')();
require('./classes/calculate.test')();

// Controller Class
require('./controllers/parkingLot')(sinon);

// Helpers test
require('./helpers/fileHandler.test')();