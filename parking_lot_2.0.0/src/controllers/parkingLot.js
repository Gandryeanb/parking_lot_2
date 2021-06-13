const fileHandler = require('../helpers/filehandler');
const { FILE_NOT_EXIST, PARKING_LOT_ALREADY_EXISTS } = require('../constants/response');
const { Command } = require('../classes/command');
const { ParkingLot } = require('../classes/parkingLot');

const parkingLot = new ParkingLot();
const command = new Command();

module.exports = (filename) => {
  const files = fileHandler(__dirname, filename);
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const arrFile = file.split(' ');
      const commandInput = arrFile[0];

      const isValid = command.validate(commandInput);
      if (!isValid) {
        console.log(PARKING_LOT_ALREADY_EXISTS);
        break;
      }

      switch (commandInput) {
        case command.getCreateParkingLot(): {
          break;
        }

        case command.getPark(): {
          break;
        }

        case command.getLeave(): {
          break;
        }

        case command.getStatus(): {
          break;
        }
      
        default: {
          break;
        }
      }
      
    }
    return file;
  }

  return(FILE_NOT_EXIST)
};
