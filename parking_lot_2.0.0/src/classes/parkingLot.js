const { Lot } = require('./lot');
const { Car } = require('./car');
const { Calculate } = require('./calculate');
const { AVAILABLE, UNAVAILABLE } = require('../constants/status');
const { PARK_IS_FULL, ALLOCATED_WITH_SLOT, LEAVE_PRICE, CAR_NOT_FOUND, TIME_SPEND_INVALID, HEADERS_GET_LIST } = require('../constants/response');
const { BASE_PRICE, BASE_TIME, ADDITIONAL_PRICE } = require('../constants/price');

class ParkingLot {
  constructor() {
    this.maxLots = 0;
    this.lots = [];
    this.calculate = new Calculate({ basePrice: BASE_PRICE, baseTime: BASE_TIME, additionalPrice: ADDITIONAL_PRICE }); 
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

  _findCar(carIdentity) {
    for (let i = 0; i < this.lots.length; i++) {
      if (this.lots[i].get().car && this.lots[i].get().car.getCar().id === carIdentity) return i;
    }
    return -1;
  }

  _getListUnavailableSlot () {
    const listResult = [];
    for (let i = 0; i < this.lots.length; i++) {
      if (this.lots[i].get().status === UNAVAILABLE) listResult.push(this.lots[i]);
    }
    return listResult;
  }

  park(carIdentity) {
    const isAvail = this._isAvailable();
    if(isAvail < 0) return PARK_IS_FULL;

    const car = new Car({ id: carIdentity })
    this.lots[isAvail].setCar(car);
    return `${ALLOCATED_WITH_SLOT}${isAvail + 1}`;
  }

  leave(carIdentity, timeSpend) {
    if (timeSpend < 1) return TIME_SPEND_INVALID;
    const lotIndex = this._findCar(carIdentity);
    if (lotIndex < 0) {
      return CAR_NOT_FOUND.replace('$1', carIdentity)
    };

    this.lots[lotIndex].leave();

    const calculateFee = this.calculate.calculatePark(Number(timeSpend));

    let result = LEAVE_PRICE;
    result = result.replace('$1', carIdentity);
    result = result.replace('$2', lotIndex + 1);
    result = result.replace('$3', calculateFee);

    return result;
  }

  get() {
    const listLots = this._getListUnavailableSlot();
    let result = `${HEADERS_GET_LIST}\n`;

    for (let i = 0; i < listLots.length; i++) {
      result += `${i + 1}\t${listLots[i].get().car.getCar().id}\n`
    }
    return this;
  }

  getList() {
    const listLots = this._getListUnavailableSlot();
    let result = `${HEADERS_GET_LIST}`;

    for (let i = 0; i < listLots.length; i++) {
      result += `\n${i + 1}\t${listLots[i].get().car.getCar().id}`
    }
    return result;
  }
}

module.exports = {
  ParkingLot,
};