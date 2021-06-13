const FileHandler = require('../helpers/filehandler');
const { FILE_NOT_EXIST, INVALID_COMMAND } = require('../constants/response');
const { Command } = require('../classes/command');
const { ParkingLot } = require('../classes/parkingLot');
class ParkingLotController {
  constructor() {
    this._parkingLot = new ParkingLot();
    this._command = new Command();
  }

  main (filename) {
    const files = FileHandler.readData(__dirname, filename);
    if (!files) return(FILE_NOT_EXIST);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const arrFile = file.split(' ');
      const commandInput = arrFile[0];
      const firstValue = arrFile[1];
      const secondValue = arrFile[2];

      const isValid = this._command.validate(commandInput);
      if (!isValid) {
        console.log(INVALID_COMMAND);
        break;
      }

      switch (commandInput) {
        case this._command.getCreateParkingLot(): {
          console.log(this._parkingLot.init({ maxLots: firstValue }));
          break;
        }

        case this._command.getPark(): {
          console.log(this._parkingLot.park(firstValue));
          break;
        }

        case this._command.getLeave(): {
          console.log(this._parkingLot.leave(firstValue, secondValue));
          break;
        }

        case this._command.getStatus(): {
          break;
        }
      
        default: {
          break;
        }
      }
    }
  }
}

module.exports = ParkingLotController;
