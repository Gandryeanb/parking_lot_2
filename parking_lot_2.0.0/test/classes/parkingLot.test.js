const { assert } = require('chai');
const { ParkingLot } = require('../../src/classes/parkingLot');

module.exports = () => {
  describe('Class Parking lot', () => {
    it('Should return same as expected with 3 lots length', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 3;

      parkingLot.init({ maxLots });

      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);
    });

    it('Should return error if try to init parkinglot more than once', () => {
        const parkingLot = new ParkingLot();
        const maxLots = 3;
        
        parkingLot.init({ maxLots });
  
        assert.equal(maxLots, parkingLot.get().maxLots);
        assert.equal(maxLots, parkingLot.get().lots.length);
        assert.throws(() => parkingLot.init({ maxLots }), Error, 'parking lot already exist')

    })
  })
}