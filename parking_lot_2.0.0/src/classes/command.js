const { CREATE_PARKING_LOT, PARK, LEAVE, STATUS } = require('../constants/command');

class Command {
  constructor () {
    this._createParkingLot = CREATE_PARKING_LOT;
    this._park = PARK;
    this._leave = LEAVE;
    this._status = STATUS;
  }

  getCreateParkingLot () {
    return this._createParkingLot;
  }

  getPark() {
    return this._park;
  }

  getLeave() {
    return this._leave;
  }

  getStatus() {
    return this._status;
  }

  _getCommandList() {
    return [this.getCreateParkingLot(), this.getLeave(), this.getPark(), this.getStatus()]
  }

  validate(command) {
    let index = this._getCommandList().indexOf(command);
    if (index < 0) return false;
    return true;
  }
}

module.exports = {
  Command,
};