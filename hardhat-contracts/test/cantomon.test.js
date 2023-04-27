const { expect } = require("chai");
const {keccak256, toBuffer,  ecsign, bufferToHex, privateToAddress} = require("ethereumjs-util");
const crypto = require("crypto");

const {
  getSelectors,
  FacetCutAction,
  removeSelectors,
  findAddressPositionInFacets
} = require('../scripts/libraries/diamond.js')

const { deploy } = require('../scripts/deploy.js')


const cantomon_Test = function () {
  const price = ethers.utils.parseUnits("0.1", "ether");
  const wl_price = ethers.utils.parseUnits("0.1", "ether");
  const max_supply = 10000;

  let diamondCutFacet;
  // var facetCuts = [];

  var nftOwnedId = 0;

  async function diamondUpgrade(tempFacet) {
    const selectors = getSelectors(tempFacet).remove(['supportsInterface(bytes4)']);
    
    let facetCuts = [];
    facetCuts.push({
      target: tempFacet.address,
      action: FacetCutAction.Add,
      selectors: selectors
    });

    tx = await diamondCutFacet.diamondCut(
      facetCuts,
      ethers.constants.AddressZero, 
      '0x',
      { gasLimit: 80000000 });
    receipt = await tx.wait();
    if (!receipt.status) {
      throw Error(`Diamond upgrade failed: ${tx.hash}`);
    }
  }

  before(async function () {
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);

    const NFTReader = await ethers.getContractFactory("NftReader");
    nftReader = await NFTReader.deploy(ethers.constants.AddressZero);

    initArg = ['Cantomon', "CANTOMON", "/BASEURI"];
    diamondAddress = await deploy(initArg);
    console.log(diamondAddress);

    proxyERC721Facet = await ethers.getContractAt("ProxyERC721Facet", diamondAddress);

    const SolidStateERC721Mock = await ethers.getContractFactory("SolidStateERC721Mock");
    mockNft = await SolidStateERC721Mock.deploy('mock', 'mock', 'MOCK');
    await mockNft.mint(owner.address);
  });
  describe("Minting Tests", function () {
    it("Check Init Arguments", async function() {
      expect(await proxyERC721Facet.name()).to.equal('Cantomon');
      expect(await proxyERC721Facet.symbol()).to.equal('CANTOMON');
      // expect(await proxyERC721Facet.tokenURI(1)).to.equal('/BASEURI/1');
    });
    it("setApprovedMessenger", async function() {
      const bytes32Value = ethers.utils.hexZeroPad(nftReader.address, 32);
      await proxyERC721Facet.setApprovedMessenger(bytes32Value);
    });
    it("Should mint 1 SBT", async function () {
      nftOwnedId = 0;
      await nftReader.portNftTest(0, mockNft.address, nftOwnedId, diamondAddress, {value: 1});
        
      let eventFilter = proxyERC721Facet.filters.Transfer();
      let events = await proxyERC721Facet.queryFilter(eventFilter);
      let lastEvent = events.pop();
      expect(lastEvent.args.to.toString()).to.equal(owner.address);
    });
    it("Transfer SBT error", async function () {
      await expect(proxyERC721Facet.transferFrom(owner.address, addr1.address, nftOwnedId)).to.be.revertedWith("ProxySbtFactory: This a Soulbound token. It cannot be transferred.");
    });
    it("switchUnbound & transfer", async function () {
      await proxyERC721Facet.switchUnbound(nftOwnedId);
      await proxyERC721Facet.transferFrom(owner.address, addr1.address, nftOwnedId);
      let eventFilter = proxyERC721Facet.filters.Transfer();
      let events = await proxyERC721Facet.queryFilter(eventFilter);
      let lastEvent = events.pop();
      expect(lastEvent.args.to.toString()).to.equal(addr1.address);
      expect(await proxyERC721Facet.ownerOf(nftOwnedId)).to.equal(addr1.address);
    });

    it("Template", async function () {
    });
  });
}

module.exports = {
  cantomon_Test
};
