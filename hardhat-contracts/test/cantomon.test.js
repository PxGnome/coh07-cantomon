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

      console.log(bytes32Value);
      await proxyERC721Facet.setApprovedMessenger(bytes32Value);
    });
    it("Should mint 1 NFT", async function () {
      nftOwnedId = 0;
      await nftReader.portNftTest(0, mockNft.address, nftOwnedId, diamondAddress, {value: 1});
        
      let eventFilter = proxyERC721Facet.filters.Transfer();
      let events = await proxyERC721Facet.queryFilter(eventFilter);
      let lastEvent = events.pop();
      console.log(lastEvent.args);
      console.log(lastEvent.args[4]);
      expect(await proxyERC721Facet.ownerOf(nftOwnedId)).to.equal(owner.address);
    });
  });
}

module.exports = {
  cantomon_Test
};


// '0x79ba5097',
//   '0x1f931c1c',
//   '0xcdffacc6',
//   '0x52ef6b2c',
//   '0xadfca15e',
//   '0x7a0ed627',
//   '0x2c408059',
//   '0x8ab5150a',
//   '0x8da5cb5b',
//   '0x91423765',
//   '0x01ffc9a7',
//   '0xf2fde38b',

//       '0x095ea7b3',
//       '0x70a08231',
//       '0x081812fc',
//       '0x56d5d475',
//       '0xe985e9c5',
//       '0x06fdde03',
//       '0x17d26dac',
//       '0x6352211e',
//       '0x42842e0e',
//       '0xb88d4fde',
//       '0xa22cb465',
//       '0xa4b7d162',
//       '0xc762dc0a',
//       '0x95d89b41',
//       '0x4f6ccce7',
//       '0x2f745c59',
//       '0xc87b56dd',
//       '0x18160ddd',
//       '0x23b872dd',