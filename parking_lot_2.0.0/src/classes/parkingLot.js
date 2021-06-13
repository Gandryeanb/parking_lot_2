const { Lot } = require('./lot');

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

  get() {
    return this;
  }
}

module.exports = {
  ParkingLot,
};