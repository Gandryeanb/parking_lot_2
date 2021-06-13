const { assert } = require('chai');
const { ParkingLot } = require('../../src/classes/parkingLot');
const { ALLOCATED_WITH_SLOT, PARK_IS_FULL } = require('../../src/constants/response')

module.exports = () => {
  describe('Class | Parking lot', () => {
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

    it('Should return available slot', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 3;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      const result = parkingLot._isAvailable();
      assert.isNumber(result);
      assert.deepEqual(result, 0)
    })

    it('Should not park a car if slot is full', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 3;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      const result1 = parkingLot._isAvailable();
      assert.isNumber(result1);
      assert.deepEqual(result1, 0)

      const result2 = parkingLot.park('112233');
      assert.isString(result2);
      assert.equal(result2, ALLOCATED_WITH_SLOT + 1);
    })

    it('Should failed parking car if slot is full', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 1;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      const result1 = parkingLot._isAvailable();
      assert.isNumber(result1);
      assert.deepEqual(result1, 0)

      const result2 = parkingLot.park('112233');
      assert.isString(result2);
      assert.equal(result2, ALLOCATED_WITH_SLOT + 1);

      const result3 = parkingLot.park('112233');
      assert.isString(result3);
      assert.equal(result3, PARK_IS_FULL);
    })
  })
}