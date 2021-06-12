const { AVAILABLE, UNAVAILABLE } = require('../constants/status');

class Lot {
  constructor({ index, car }) {
    this.index = index;
    this.car = car || null;
    this.status = AVAILABLE;
  }

  get () {
    return this;
  }

  setCar(value) {
    this.car = value;
    this.status = UNAVAILABLE
    return this;
  }
}

module.exports = {
  Lot,
};