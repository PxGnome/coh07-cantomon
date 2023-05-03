const hre = require("hardhat");

const { deployDiamond } = require('./deployDiamond.js')

// npx hardhat run --network localhost scripts/deployOrigin.js
// npx hardhat run --network sepolia scripts/deployOrigin.js

async function main() {
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    
    // PARAMETER TO UPDATE
    outbox = '0xCC737a94FecaeC165AbCf12dED095BB13F037685';

    const NFTReader = await ethers.getContractFactory("NftReader");
    nftReader = await NFTReader.deploy(outbox);
    console.log('NftReader deployed:', nftReader.address);

    SolidStateERC721Mock = await ethers.getContractFactory("SolidStateERC721Mock");
    mockNft = await SolidStateERC721Mock.deploy('mock', 'mock', 'MOCK');
    console.log('mockNft deployed:', mockNft.address);
    await mockNft.mint(owner.address);
    console.log(`deployOrigin.js Complete`);
}

if (require.main === module) {
  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
}