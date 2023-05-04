const hre = require("hardhat");

const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')

// npx hardhat run --network localhost scripts/manageDiamond.js
// npx hardhat run --network cantotestnet scripts/upgradeDiamond.js

async function main() {
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    
    diamondAddress = '0x18A49798acC71cC1a089784d9D213d1ec6EAE966';
    diamondInitName = '';
    upgradeContract = '0xbDD394fac7b39DfBf8f8fe3d47E4e8bb8fD90581';

    console.log('');
    console.log('Diamond Upgrade beginning');
    console.log('');

    if(diamondAddress == '') {
        return console.log('diamondAddress is empty -- ABORT');
    }

    const cantomonDiamond = await ethers.getContractAt("CantomonDiamond", diamondAddress);
    console.log('CantomonDiamond found at:', cantomonDiamond.address);

    if(diamondInitName != '') {
        DiamondInit = await ethers.getContractFactory(diamondInitName);
        diamondInit = await DiamondInit.deploy();
        initAddress = diamondInit.address;
        encodedFunction = diamondInit.interface.encodeFunctionData('init', _initArg);
        console.log(`diamondInit deployed: ${diamondInit.address}`);
    } else {
    initAddress = ethers.constants.AddressZero;
    encodedFunction = '0x'; 
    console.log(`no diamondInit deployed`);
    }

    var FacetNames = [
        'TurnstileFacet'
    ]
    var facetCuts = [];

    for (var FacetName of FacetNames) {
        if(upgradeContract == '') {
            Facet = await ethers.getContractFactory(FacetName);
            facet = await Facet.deploy();
            await facet.deployed();
            console.log(`${FacetName} deployed: ${facet.address}`);
        } else {
            facet = await ethers.getContractAt(FacetName, upgradeContract);
            console.log(`${FacetName} found at: ${facet.address}`);
        }

        facetCuts.push({
            target: facet.address,
            action: FacetCutAction.Add,
            selectors:  getSelectors(facet)
        })
    }
    tx = await cantomonDiamond.diamondCut(
        facetCuts,
        initAddress,
        encodedFunction,
        { gasLimit: 8000000 }
    )
    receipt = await tx.wait()
    if (!receipt.status) {
        throw Error(`Diamond upgrade failed: ${tx.hash}`)
    }
    console.log('')
    console.log(`Diamond upgrade succeeded and completed`)
    return cantomonDiamond.address;

}

if (require.main === module) {
  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
}