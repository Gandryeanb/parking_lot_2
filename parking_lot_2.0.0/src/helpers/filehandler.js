const fs = require('fs');

module.exports = class FileHandler {
  static readData (dirname, filename) {
    try {
      const path = dirname + '/../files/' + filename;
      const rawFile = fs.readFileSync(path, 'utf8');
      return rawFile.split('\n');
    } catch (error) {
      return false;
    }
  }
};