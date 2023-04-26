const { expect } = require("chai");
const {keccak256, toBuffer,  ecsign, bufferToHex, privateToAddress} = require("ethereumjs-util");
const crypto = require("crypto");

const ERC721A_Test = function () {
  const price = ethers.utils.parseUnits("0.1", "ether");
  const wl_price = ethers.utils.parseUnits("0.1", "ether");
  const max_supply = 10000;

  var nftToken;

  before(async function () {
    // Get the ContractFactory and Signers here.
    const NFTContract = await ethers.getContractFactory("ERC721A_Template");
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    nftToken = await NFTContract.deploy("ERC721A_Template", "erc721a", "uri", 0);
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
  });
  describe("Initial Tests", function () {
    it("Should return the right name", async function () {
      expect(await nftToken.name()).to.equal("ERC721A_Template");
    });
    it("Should return the right symbol", async function () {
      expect(await nftToken.symbol()).to.equal("erc721a");
    });
    it("Should return the right uri", async function () {   
      expect(await nftToken.getBaseURI()).to.equal("uri");
    });
    it("Should return the right owner", async function () {
      expect(await nftToken.owner()).to.equal(owner.address);
    });
  });
  describe("Minting Tests", function () {
    before(async function () {
      await nftToken.setMintOpen(true);
    });
    it("Should mint 1 NFT", async function () {
      await nftToken.mint(owner.address, 1, {value: price});
      expect(await nftToken.balanceOf(owner.address)).to.equal(1);
    });
  });
}

module.exports = {
  ERC721A_Test
};
