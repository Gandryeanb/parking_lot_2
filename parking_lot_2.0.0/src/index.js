const readline = require('readline');

const parkingLotController = require('./controllers/parkingLot');

const commandInput = (rl) =>  rl.question("filename: ", filename => {
  console.log(parkingLotController(filename))
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