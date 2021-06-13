const { Lot } = require('./lot');
const { Car } = require('./car');
const { AVAILABLE } = require('../constants/status');
const {  PARK_IS_FULL, ALLOCATED_WITH_SLOT } = require('../constants/response');

class ParkingLot {
  constructor() {
    this.maxLots = 0;
    this.lots = [];
  }

  init({ maxLots }) {
    if (this.lots.length) throw new Error('parking lot already exist');
    for (let i = 0; i < maxLots; i++) {
      const lot = new Lot({ index: i });
      this.lots.push(lot);
    }
    this.maxLots = maxLots;
    return `Created parking lot with ${maxLots} slots`;
  }

  _isAvailable() {
    for (let i = 0; i < this.lots.length; i++) {
      if (this.lots[i].get().status === AVAILABLE) return i;
    }
    return -1;
  }

  park(carIdentity) {
    const isAvail = this._isAvailable();
    if(isAvail < 0) return PARK_IS_FULL;

    const car = new Car({ id: carIdentity })
    this.lots[isAvail].setCar(car);
    return `${ALLOCATED_WITH_SLOT}${isAvail + 1}`;
  }

  get() {
    return this;
  }
}

module.exports = {
  ParkingLot,
};