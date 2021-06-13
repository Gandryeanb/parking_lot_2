const { assert } = require('chai');
const { ParkingLot } = require('../../src/classes/parkingLot');
const { ALLOCATED_WITH_SLOT, PARK_IS_FULL, TIME_SPEND_INVALID, CAR_NOT_FOUND } = require('../../src/constants/response')

module.exports = () => {
  describe('Class | Parking lot', () => {
    it('Should return same as expected with 3 lots length', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 3;

      parkingLot.init({ maxLots });

      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);
    });

    it('Should return error if try to init parkinglot more than once', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 3;
      
      parkingLot.init({ maxLots });

      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);
      assert.throws(() => parkingLot.init({ maxLots }), Error, 'parking lot already exist')
    })

    it('Should return available slot', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 3;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      const result = parkingLot._isAvailable();
      assert.isNumber(result);
      assert.deepEqual(result, 0)
    })

    it('Should return index -1', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 1;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      parkingLot.park('112233');

      const result = parkingLot._isAvailable();
      assert.isNumber(result);
      assert.deepEqual(result, -1)
    })

    it('Should not park a car if slot is full', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 3;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      const result1 = parkingLot._isAvailable();
      assert.isNumber(result1);
      assert.deepEqual(result1, 0)

      const result2 = parkingLot.park('112233');
      assert.isString(result2);
      assert.equal(result2, ALLOCATED_WITH_SLOT + 1);
    })

    it('Should failed parking car if slot is full', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 1;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      const result1 = parkingLot._isAvailable();
      assert.isNumber(result1);
      assert.deepEqual(result1, 0)

      const result2 = parkingLot.park('112233');
      assert.isString(result2);
      assert.equal(result2, ALLOCATED_WITH_SLOT + 1);

      const result3 = parkingLot.park('112233');
      assert.isString(result3);
      assert.equal(result3, PARK_IS_FULL);
    })

    it('Should return index car', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 1;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      parkingLot.park('112233');

      const result = parkingLot._findCar('112233');
      assert.isNumber(result);
      assert.deepEqual(result, 0)

      const result1 = parkingLot._findCar('112234');
      assert.isNumber(result1);
      assert.deepEqual(result1, -1)
    });

    it('Should leave a car with expected calculation fee', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 1;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      parkingLot.park('112233');
      
      const result =  parkingLot.leave('112233', 4);
      assert.equal(result, 'Registration number 112233 with Slot Number 1 is free with Charge 30')
    })

    it('Should failed leave car if time spend invalid', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 1;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      parkingLot.park('112233');
      
      const result =  parkingLot.leave('112233', 0);
      assert.equal(result, TIME_SPEND_INVALID)
    })

    it('Should failed leave car if Car not found', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 1;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      parkingLot.park('112233');
      
      const result =  parkingLot.leave('112234', 30);
      assert.equal(result, 'Registration number 112234 not found')
    })

    it('Should give list lots unavailable only', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 4;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      parkingLot.park('1111');
      parkingLot.park('2222');
      
      const result = parkingLot._getListUnavailableSlot();

      const expectedResult = [
        {
          index: 0,
          car: { id: '1111', color: undefined },
          status: 'UNAVAILABLE'
        },
        {
          index: 1,
          car: { id: '2222', color: undefined },
          status: 'UNAVAILABLE',
        },
      ];

      assert.deepEqual(result, expectedResult)
    })

    it('Should give list lots unavailable only like table', () => {
      const parkingLot = new ParkingLot();
      const maxLots = 4;
      
      parkingLot.init({ maxLots });
      assert.equal(maxLots, parkingLot.get().maxLots);
      assert.equal(maxLots, parkingLot.get().lots.length);

      parkingLot.park('1111');
      parkingLot.park('2222');
      
      const result = parkingLot.getList();
      assert.equal(result, `Slot No. Registration No.\n1\t1111\n2\t2222`)
    })
  })
}