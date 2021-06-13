const fileHandler = require('../helpers/filehandler');
const { FILE_NOT_EXIST } = require('../constants/response');

module.exports = (filename) => {
  const path = `${__dirname}/../files/${filename}`
  const file = fileHandler(path);
  if (file) {
    
  }

  return(FILE_NOT_EXIST)
};