import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  var baseURI = "https://alterhorizons.mypinata.cloud/ipfs/QmTd5pg3AmMCXrX53mo7piKiVTb3JFsJasqyLFrWhUPcYW/";

  var _devAdd = owner.address; //Please update for deployment
  var _artistAdd = owner.address; //Please update for deployment

  // We get the contract to deploy
  const Tokens = await ethers.getContractFactory("ERC721A_Template");
  const tokens = await Tokens.deploy(owner.address, 100, baseURI, _devAdd, _artistAdd);

  await tokens.deployed();

  console.log("ERC721A_Template Contract deployed to: ", tokens.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  // npx hardhat run --network localhost scripts/deploy_NFT.js
