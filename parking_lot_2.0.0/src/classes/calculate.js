class Calculate {
  constructor({ basePrice, baseTime, additionalPrice }) {
    this._basePrice = basePrice;
    this._baseTime = baseTime;
    this._additionalPrice = additionalPrice;
  }

  calculatePark (timeSpend) {
    const timeAdditional = (Number(timeSpend) - this._baseTime ) < 0 ? 0 : (Number(timeSpend) - this._baseTime );
    return this._basePrice + ( timeAdditional * this._additionalPrice)
  }
}

module.exports = {
  Calculate,
};