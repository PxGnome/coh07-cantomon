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

    proxyERC721Facet = await ethers.getContractAt("ProxyERC721Facet", diamondAddress);
    gmFacet = await ethers.getContractAt("GMFacet", diamondAddress);
    battleFacet = await ethers.getContractAt("BattleFacet", diamondAddress);
    evolutionFacet = await ethers.getContractAt("EvolutionFacet", diamondAddress);
    

    SolidStateERC721Mock = await ethers.getContractFactory("SolidStateERC721Mock");
    mockNft = await SolidStateERC721Mock.deploy('mock', 'mock', 'MOCK');
    await mockNft.mint(owner.address);
  });
  describe("Minting Tests", function () {
    it("Check ProxyERC721Facet Init Arguments", async function() {
      expect(await proxyERC721Facet.name()).to.equal('Cantomon');
      expect(await proxyERC721Facet.symbol()).to.equal('CANTOMON');
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
    it("Declare gmFacet variables", async function () {
      version = 1;
      season = 1;
      await gmFacet.setGameVersion(version);
      expect(await gmFacet.getGameVersion()).equal(version);
      await gmFacet.setGameSeason(season);
      expect(await gmFacet.getGameSeason()).equal(season);

      xpRules = [60, 120, 180];

      for(let i = 0; i < xpRules.length; i++) {
        await gmFacet.setEvolutionXpforEvo(i, xpRules[i]);
        expect(await gmFacet.getEvolutionXpforEvo(i)).equal(xpRules[i]);
      }
      
      evoOptions = {
        0: [1, 2, 3],
        1: [4, 5],
        2: [6, 7],
        3: [8, 9]
      }

      for(let i = 0; i < evoOptions.length; i++) {
        await gmFacet.setEvolutionOptions(i, evoOptions[i]);
        expect(await gmFacet.getEvolutionOptions(i)).to.deep.equal(evoOptions[i]);
      }

      evoRequirements = {
        0: [0, 0, 0, 0],
        1: [0, 0, 0, 0],
        2: [0, 0, 0, 0],
        3: [0, 0, 0, 0],
        4: [1, 0, 0, 0],
        5: [1, 50, 0, 0],
        6: [2, 0, 0, 0],
        7: [2, 50, 0, 0],  
        8: [3, 0, 0, 0],
        9: [3, 50, 0, 0]
      }
      
      for(let i = 0; i < evoRequirements.length; i++) {
        await gmFacet.setEvolutionRequirements(i, evoRequirements[i]);
        expect(await gmFacet.getEvolutionRequirements(i)).to.deep.equal(evoRequirements[i]);
      }

      evoBonus = {
        0: [0, 0],
        1: [0, 0],
        2: [0, 0],
        3: [0, 0],
        4: [10, 0],
        5: [20, 0],
        6: [10, 0],
        7: [20, 0],
        8: [10, 0],
        9: [20, 0]
      }

      for(let i = 0; i < evoBonus.length; i++) {
        await gmFacet.setEvolutionBonus(i, evoBonus[i]);
        expect(await gmFacet.getEvolutionBonus(i)).to.deep.equal(evoBonus[i]);
      }
    });


    it("hatch", async function () {
      
    });

    it("train", async function () {

    });
    it("feed", async function () {

    });
  });
}

module.exports = {
  cantomon_Test
};


