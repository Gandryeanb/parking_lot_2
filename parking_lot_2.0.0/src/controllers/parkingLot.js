const fileHandler = require('../helpers/filehandler');
const { FILE_NOT_EXIST } = require('../constants/response');

module.exports = (filename) => {
  const file = fileHandler(__dirname, filename);
  if (file) {
    return 'EXIST';
  }

  return(FILE_NOT_EXIST)
};
