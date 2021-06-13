const fs = require('fs');

module.exports = (dirname, filename) => {
  try {
    const path = dirname + '/../files/' + filename;
    const rawFile = fs.readFileSync(path, 'utf8');
    return rawFile.split('\n');
  } catch (error) {
    return false;
  }
};