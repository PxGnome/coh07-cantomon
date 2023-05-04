const {cantomon_Test} = require('./cantomon.test');
const {cantomonShowcase_Test} = require('./cantomonShowcase.test');


module.exports = {
    cantomon_Test,
    cantomonShowcase_Test,
};

var currentdate = new Date(); 
var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

describe('Aggregate Testing on: ' + datetime, function () {
    describe('NFT Mint Test for cantomon_Test', function () {
        // cantomon_Test();
        cantomonShowcase_Test();
    });
});

// CMD: npx hardhat test test/index.js