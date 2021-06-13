const fs = require('fs');

module.exports = (path) => {
  try {
    const rawFile = fs.readFileSync(path, 'utf8');
    const arrInput = rawFile.split('\n');
    return arrInput;
  } catch (error) {
    return false;
  }
};