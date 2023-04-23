const {ERC721A_Test} = require('./ERC721A_Test.test');

module.exports = {
    ERC721A_Test,
};

var currentdate = new Date(); 
var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

describe('Aggregate Testing on: ' + datetime, function () {
    describe('NFT Mint Test for ERC721A Template', function () {
        ERC721A_Test();
    });
});

// CMD: npx hardhat test test/index.js