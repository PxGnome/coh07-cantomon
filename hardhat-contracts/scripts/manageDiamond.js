const hre = require("hardhat");

const { deployDiamond } = require('./deployDiamond.js')

// npx hardhat run --network localhost scripts/manageDiamond.js
// npx hardhat run --network cantotestnet scripts/manageDiamond.js

async function main() {
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();

    nftReaderAddress = '0xcF6F356d3195554ebDfE06257791cd22Bc2f4CE7';
    diamondAddress = '0x18A49798acC71cC1a089784d9D213d1ec6EAE966';

    if(nftReaderAddress == '' || diamondAddress == '') {
    return console.log('nftReaderAddress or diamondAddress is empty -- ABORT');
    }

    proxyERC721Facet = await ethers.getContractAt("ProxyERC721Facet", diamondAddress);
    gmFacet = await ethers.getContractAt("GMFacet", diamondAddress);
    evolutionFacet = await ethers.getContractAt("EvolutionFacet", diamondAddress);
    dojoFacet = await ethers.getContractAt("DojoFacet", diamondAddress);
    turnstileFacet = await ethers.getContractAt("TurnstileFacet", diamondAddress);

    //Script Start Here
    // baseURI = "https://pxgnome.mypinata.cloud/ipfs/QmYTPAgd3eAYdLgipvPQehwRdgUgCZwdpLdC9tWbJmi9in/";
    // await proxyERC721Facet.updateBaseURI(baseURI);
    // console.log(`baseURI updated to ${baseURI}`);

    turnstileAddr = '0xEcf044C5B4b867CFda001101c617eCd347095B44';
    result = await turnstileFacet.register(turnstileAddr);
    console.log(result);
    console.log(`Registered on Turnstile: ${turnstileAddr} `);
}

if (require.main === module) {
  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
}