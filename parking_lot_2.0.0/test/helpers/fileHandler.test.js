const { assert } = require('chai');
const fileHandler = require('../../src/helpers/filehandler');

module.exports = () => {
  describe('Helper | fileHandlers', () => {
    it('Should return arr of string from input', () => {
      const filename = `test-01.txt`;

      const fileHandlerResult = fileHandler(__dirname, filename);
      assert.exists(fileHandlerResult);
      assert.isArray(fileHandlerResult);
      assert.equal(fileHandlerResult.length, 2);
    });

    it('Should return boolean false if file is not exist', () => {
      const filename = `test-02.txt`;

      const fileHandlerResult = fileHandler(__dirname, filename);
      assert.isBoolean(fileHandlerResult);
      assert.isFalse(fileHandlerResult);
    })
  })
}