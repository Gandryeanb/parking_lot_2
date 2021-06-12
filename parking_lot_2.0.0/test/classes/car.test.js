const { assert } = require('chai');
const { Car } = require('../../src/classes/car');

module.exports = () => {
  describe('Class Car', () => {
    it('Should return same car as input', () => {
      const carId = '12345';
      const car = new Car({ id: carId });

      const getCar = car.getCar();

      assert.equal(getCar.id, carId);

    })
  })
}