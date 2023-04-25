const {cantomon_Test} = require('./cantomon.test');

module.exports = {
    cantomon_Test,
};

var currentdate = new Date(); 
var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

describe('Aggregate Testing on: ' + datetime, function () {
    describe('NFT Mint Test for cantmon_Test', function () {
        cantomon_Test();
    });
});

// CMD: npx hardhat test test/index.js