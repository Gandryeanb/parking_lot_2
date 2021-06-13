const readline = require('readline');

const ParkingLotController = require('./controllers/parkingLotController');
const parkingLotController = new ParkingLotController();

const commandInput = (rl) =>  rl.question("filename: ", filename => {
  parkingLotController.main(filename)
  commandInput(rl);
});
const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  commandInput(rl)
};

main();