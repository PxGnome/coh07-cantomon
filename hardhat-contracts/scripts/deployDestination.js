const hre = require("hardhat");

const { deployDiamond } = require('./deployDiamond.js')

// npx hardhat run --network localhost scripts/deployDestination.js
// npx hardhat run --network cantotestnet scripts/deployDestination.js


async function main() {
  [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

  // PARAMETER TO UPDATE
  initArg = ['Cantomon', "CANTOMON", "/BASEURI/"];
  nftReaderAddress = '0xcF6F356d3195554ebDfE06257791cd22Bc2f4CE7';
  
  if(nftReaderAddress == '') {
    return console.log('nftReaderAddress is empty -- ABORT');
  }

  diamondAddress = await deployDiamond(initArg);

  proxyERC721Facet = await ethers.getContractAt("ProxyERC721Facet", diamondAddress);
  gmFacet = await ethers.getContractAt("GMFacet", diamondAddress);
  evolutionFacet = await ethers.getContractAt("EvolutionFacet", diamondAddress);
  dojoFacet = await ethers.getContractAt("DojoFacet", diamondAddress);

  bytes32Value = ethers.utils.hexZeroPad(nftReaderAddress, 32);
  await proxyERC721Facet.setApprovedMessenger(bytes32Value);
  await proxyERC721Facet.setApprovedForSbtTransfer(diamondAddress, true);
  console.log(`deployDestination.js Complete`);
}

if (require.main === module) {
  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
}