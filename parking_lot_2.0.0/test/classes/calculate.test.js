const { assert } = require('chai');
const { Calculate } = require('../../src/classes/calculate');

module.exports = () => {
  describe('Class | Calculate', () => {
    it('Should return same as expected', () => {
      const timeSpend = 4;
      const calculate = new Calculate({ basePrice: 10, baseTime: 2, additionalPrice: 10 })
      const result = calculate.calculatePark(timeSpend);

      assert.equal(result, 30);

    })
  })
}