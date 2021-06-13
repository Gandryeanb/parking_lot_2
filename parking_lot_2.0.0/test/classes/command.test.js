const { assert } = require('chai');
const { Command } = require('../../src/classes/command');
const { CREATE_PARKING_LOT } = require('../../src/constants/command');

module.exports = () => {
  describe('Command Class', () => {
    it('Should return true', () => {
      const command = new Command();
      const commandInputt = CREATE_PARKING_LOT;

      const isValid = command.validate(commandInputt);
      assert.isBoolean(isValid);
      assert.isTrue(isValid);
    })

    it('Should return false', () => {
      const command = new Command();
      const commandInputt = 'RANDOM COMMAND';

      const isValid = command.validate(commandInputt);
      assert.isBoolean(isValid);
      assert.isFalse(isValid);
    })
  })
}