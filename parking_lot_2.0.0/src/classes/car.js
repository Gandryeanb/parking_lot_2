class Car {
  constructor({ id, color }) {
    this.id = id;
    this.color = color;
  }

  getCar () {
    return this;
  }
}

module.exports = {
  Car,
}