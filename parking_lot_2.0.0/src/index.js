const readline = require('readline');

const parkingLotController = require('./controllers/parkingLot');

const commandInput = (rl) => {
  rl.question("filename: ", function(filename) {
    console.log(parkingLotController(filename))
    rl.close()
  });

  rl.on("close", function() {
    commandInput(rl);
  });
}

const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  commandInput(rl)
};

main();