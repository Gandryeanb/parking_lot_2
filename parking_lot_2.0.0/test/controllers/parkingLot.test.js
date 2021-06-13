const { assert } = require('chai');

const ParkingLotController = require('../../src/controllers/parkingLotController');
const { ParkingLot } = require('../../src/classes/parkingLot');
const Filehandler = require('../../src/helpers/filehandler');


module.exports = (sinon) => {
  describe('Controller | parking lot', () => {
    it('Should call create park lot once', () => {
      const parkingLotController = new ParkingLotController();
      const spy1 = sinon.spy(ParkingLot.prototype, 'init');

      sinon.stub(Filehandler, 'readData').returns(['create_parking_lot 6']);

      parkingLotController.main('test.txt');

      assert.equal(spy1.callCount, 1);
    })

    it('Should park car once', () => {
      const parkingLotController = new ParkingLotController();
      const spy1 = sinon.spy(ParkingLot.prototype, 'park');

      sinon.stub(Filehandler, 'readData').returns(['create_parking_lot 6', 'park KA-01-HH-1234']);

      parkingLotController.main('test.txt');

      assert.equal(spy1.callCount, 1);
    })

    it('Should leave car once', () => {
      const parkingLotController = new ParkingLotController();
      const spy1 = sinon.spy(ParkingLot.prototype, 'leave');

      sinon.stub(Filehandler, 'readData').returns(['create_parking_lot 6', 'park KA-01-HH-3141', 'leave KA-01-HH-3141 4']);

      parkingLotController.main('test.txt');

      assert.equal(spy1.callCount, 1);
    })

    it('Should leave car once', () => {
      const parkingLotController = new ParkingLotController();
      const spy1 = sinon.spy(ParkingLot.prototype, 'getList');

      sinon.stub(Filehandler, 'readData').returns(['create_parking_lot 6', 'park KA-01-HH-3141', 'status']);

      parkingLotController.main('test.txt');

      assert.equal(spy1.callCount, 1);
    })
  });
}