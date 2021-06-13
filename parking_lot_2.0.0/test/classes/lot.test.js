const { assert } = require('chai');
const { UNAVAILABLE, AVAILABLE } = require('../../src/constants/status');
const { Car } = require('../../src/classes/car');
const { Lot } = require('../../src/classes/lot');

module.exports = () => {
  describe('Class | Lot', () => {
    it('Should return same car as input', () => {
      const carId = '12345';
      const indexLot = 1;
      const car = new Car({ id: carId });
      const lot = new Lot({ index: 1 });
      assert.deepEqual(lot.status, AVAILABLE);

      const lotInstance = lot.setCar(car);
      assert.equal(lotInstance.index, indexLot);
      assert.deepEqual(lotInstance.car, car);

      const getLot = lot.get();
      assert.equal(getLot.index, indexLot);
      assert.deepEqual(getLot.car, car);
      assert.deepEqual(getLot.status, UNAVAILABLE);

    })
  })
}