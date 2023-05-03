const { expect } = require("chai");
const {keccak256, toBuffer,  ecsign, bufferToHex, privateToAddress} = require("ethereumjs-util");
const crypto = require("crypto");

const { time } = require("@nomicfoundation/hardhat-network-helpers");

const {
  getSelectors,
  FacetCutAction,
  removeSelectors,
  findAddressPositionInFacets
} = require('../scripts/libraries/diamond.js')

const { deployDiamond } = require('../scripts/deployDiamond.js')


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

  function coloredLog(color, message) {
    console.log(`\x1b[${color}m%s\x1b[0m`, message);
    // Black: \x1b[30m
    // Red: \x1b[31m
    // Green: \x1b[32m
    // Yellow: \x1b[33m
    // Blue: \x1b[34m
    // Magenta: \x1b[35m
    // Cyan: \x1b[36m
    // White: \x1b[37m
  }

  before(async function () {
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);

    const NFTReader = await ethers.getContractFactory("NftReader");
    nftReader = await NFTReader.deploy(ethers.constants.AddressZero);

    initArg = ['Cantomon', "CANTOMON", "/BASEURI/"];
    diamondAddress = await deployDiamond(initArg);

    proxyERC721Facet = await ethers.getContractAt("ProxyERC721Facet", diamondAddress);
    gmFacet = await ethers.getContractAt("GMFacet", diamondAddress);
    evolutionFacet = await ethers.getContractAt("EvolutionFacet", diamondAddress);
    dojoFacet = await ethers.getContractAt("DojoFacet", diamondAddress);

    SolidStateERC721Mock = await ethers.getContractFactory("SolidStateERC721Mock");
    mockNft = await SolidStateERC721Mock.deploy('mock', 'mock', 'MOCK');
    await mockNft.mint(owner.address);
  });
  describe("ProxyERC721Facet Tests", function () {
    it("Check ProxyERC721Facet Init Arguments", async function() {
      expect(await proxyERC721Facet.name()).to.equal('Cantomon');
      expect(await proxyERC721Facet.symbol()).to.equal('CANTOMON');
      await proxyERC721Facet.setApprovedForSbtTransfer(diamondAddress, true);
      expect(await proxyERC721Facet.checkApprovedForSbtTransfer(diamondAddress)).to.equal(true);
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
      cantomonId = lastEvent.args.tokenId;
      coloredLog('32', "Cantomon ID Minted: "+ cantomonId.toString());
      expect(lastEvent.args.to.toString()).to.equal(owner.address);
    });
    it("Transfer SBT error", async function () {
      await expect(proxyERC721Facet.transferFrom(owner.address, addr1.address, nftOwnedId)).to.be.revertedWith("ProxySbtFactory: This a Soulbound token. It cannot be transferred.");
    });

    it("switchUnbound & transfer", async function () {
      await proxyERC721Facet.switchUnbound(cantomonId);
      await proxyERC721Facet.transferFrom(owner.address, addr1.address, nftOwnedId);
      let eventFilter = proxyERC721Facet.filters.Transfer();
      let events = await proxyERC721Facet.queryFilter(eventFilter);
      let lastEvent = events.pop();
      expect(lastEvent.args.to.toString()).to.equal(addr1.address);
      expect(await proxyERC721Facet.ownerOf(cantomonId)).to.equal(addr1.address);
    });
    it("test tokenURI and updateBase URI", async function () {
      expect(await proxyERC721Facet.tokenURI(cantomonId)).to.equal("/BASEURI/0");
      await proxyERC721Facet.updateBaseURI("https://test.com/");
      expect(await proxyERC721Facet.tokenURI(cantomonId)).to.equal("https://test.com/0");
    });


    async function portNftTest(_amount) {
      for(let i = 0; i < _amount; i++) {
        await nftReader.portNftTest(0, mockNft.address, nftOwnedId, diamondAddress, {value: 1});
            
        let eventFilter = proxyERC721Facet.filters.Transfer();
        let events = await proxyERC721Facet.queryFilter(eventFilter);
        let lastEvent = events.pop();
        cantomonId = lastEvent.args.tokenId;
        console.log("Cantomon ID Minted: ", cantomonId.toString(), "  to: ", lastEvent.args.to.toString());
      }
    }

    describe("Cantomon Game Tests", function () {
      before(async function () {
        portNftTest(5);
      });

      it("Declare gmFacet variables", async function () {
        version = 1;
        season = 1;
        await gmFacet.setGameVersion(version);
        expect(await gmFacet.getGameVersion()).equal(version);
        await gmFacet.setGameSeason(season);
        expect(await gmFacet.getGameSeason()).equal(season);
  
        fees = {
          'incubateCantomon': ethers.utils.parseUnits("0.01", "ether"),
        }
  
        for (const key in fees) {
          await gmFacet.setFee(key, fees[key]);
          expect(await gmFacet.getFee(key)).equal(fees[key]);
        }
        xpRules = [1440, 2880, 4320];
  
        for(let i = 0; i < xpRules.length; i++) {
          await gmFacet.setEvolutionXpforEvo(i, xpRules[i]);
          expect(await gmFacet.getEvolutionXpforEvo(i)).equal(xpRules[i]);
        }
        
        evoOptions = {
          0: [1, 2, 3],
          1: [4, 5, 10],
          2: [6, 7, 10],
          3: [8, 9, 10]
        }
  
        for(let i = 0; i < evoOptions.length; i++) {
          await gmFacet.setEvolutionOptions(i, evoOptions[i]);
          expect(await gmFacet.getEvolutionOptions(i)).to.deep.equal(evoOptions[i]);
        }
  
        evoRequirements = {
          0: [0, 0, 0],
          1: [0, 0, 0],
          2: [0, 0, 0],
          3: [0, 0, 0],
          4: [0, 0, 0],
          5: [50, 0, 0],
          6: [0, 0, 0],
          7: [50, 0, 0],  
          8: [0, 0, 0],
          9: [50, 0, 0],
          10: [99, 0, 0],
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
          9: [20, 0],
          10: [25, 0]
        }
  
        for(let i = 0; i < evoBonus.length; i++) {
          await gmFacet.setEvolutionBonus(i, evoBonus[i]);
          expect(await gmFacet.getEvolutionBonus(i)).to.deep.equal(evoBonus[i]);
        }
      });
  
      it("incubate", async function () {
        cantomonId = 1;
        expect(await evolutionFacet.getEvoStage(cantomonId)).to.equal(0);
        await evolutionFacet.incubateCantomon(cantomonId, {value: fees['incubateCantomon']});
        expect(await evolutionFacet.getEvoStage(cantomonId)).to.equal(1);
        evoId = await evolutionFacet.getEvolutionId(cantomonId);
        coloredLog('32', `Cantomon ID ${cantomonId} evolved into ${evoId}`);
        
      });
      it("check xp change after 1 hour", async function () {
        result = await evolutionFacet.getXp(cantomonId);
        expect(result).to.equal(0);

        coloredLog('35',"Time: " + await time.latest());
        xpPerMin = 60;
        await time.increase(1440*xpPerMin);
        coloredLog('35',"Time: " + await time.latest());

        result = await evolutionFacet.getXp(cantomonId);
        expect(result).to.equal(1440);
        coloredLog('35', `Cantomon ${cantomonId} got ${result} xp`);

      });

      it("hatch", async function () {
        cantomonId = 2;
        expect(await evolutionFacet.getEvoStage(cantomonId)).to.equal(0);
        result = await evolutionFacet.myXpForEvo(cantomonId);

        result = await evolutionFacet.getXp(cantomonId);
        coloredLog('35', `Cantomon ${cantomonId} got ${result} xp`);

        await evolutionFacet.hatchCantomon(cantomonId);
        expect(await evolutionFacet.getEvoStage(cantomonId)).to.equal(1);
        evoId = await evolutionFacet.getEvolutionId(cantomonId);
        coloredLog('32', `Cantomon ID ${cantomonId} evolved into ${evoId}`);
      });

      it("feed", async function () {
        cantomonId = 1;
        stats = await gmFacet.getCantomonDynamicStats(cantomonId);
        expect(stats.happiness).to.equal(0);
        expect(stats.energy).to.equal(0);
        await evolutionFacet.feedCantomon_01(cantomonId);
        newStats = await gmFacet.getCantomonDynamicStats(cantomonId);
        expect(newStats.happiness).to.equal(stats.happiness.add(10));
        expect(newStats.energy).to.equal(stats.skill.add(1));
      });
  
      it("train 01", async function () {
        cantomonId = 2;
        stats = await gmFacet.getCantomonDynamicStats(cantomonId);
        expect(stats.happiness).to.equal(0);
        expect(stats.skill).to.equal(0);
        await evolutionFacet.trainCantomon_01(cantomonId);
        newStats = await gmFacet.getCantomonDynamicStats(cantomonId);
        expect(newStats.happiness).to.equal(stats.happiness.add(10));
        expect(newStats.skill).to.equal(stats.skill.add(1));
      });

      it("train 02", async function () {
        stats = await gmFacet.getCantomonDynamicStats(cantomonId);
        await evolutionFacet.trainCantomon_02(cantomonId);
        newStats = await gmFacet.getCantomonDynamicStats(cantomonId);
        expect(newStats.happiness).to.equal(stats.happiness.add(10));
        
        let eventFilter = evolutionFacet.filters.TrainCantomon();
        let events = await evolutionFacet.queryFilter(eventFilter);
        let lastEvent = events.pop();

        expect(newStats.skill).to.equal(stats.skill.add(lastEvent.args.skillGrowth));
      });
      
      it("Create Dojo", async function () {
        await dojoFacet.createDojo(cantomonId);
        expect(await dojoFacet. 
          isDojoOpen(cantomonId)).to.equal(true);
      });
      it("Register Dojo", async function () {
        await dojoFacet.registerDojo(cantomonId);
        let eventFilter = dojoFacet.filters.RegisterDojo();
        let events = await dojoFacet.queryFilter(eventFilter);
        let lastEvent = events.pop();
        expect(lastEvent.args.cantomonId).to.equal(cantomonId);
      });
      it("dojoSelectSparring", async function () {
        challengerId = 1;
        await dojoFacet.dojoSelectSparring(challengerId, cantomonId);
        let eventFilter = dojoFacet.filters.DojoBattle();
        let events = await dojoFacet.queryFilter(eventFilter);
        let lastEvent = events.pop();
        expect(lastEvent.args.cantomonId).to.equal(challengerId);
        coloredLog('32', `Cantomon ID ${cantomonId} fought Dojo ID ${lastEvent.args.dojoId} with result win =  ${lastEvent.args.didCantomonWin} xp`);
      });
      it("Close Dojo", async function () {
        await dojoFacet.closeDojo(cantomonId);
        let eventFilter = dojoFacet.filters.CloseDojo();
        let events = await dojoFacet.queryFilter(eventFilter);
        let lastEvent = events.pop();
        expect(lastEvent.args.cantomonId).to.equal(cantomonId);
      });
    });
  });
}

module.exports = {
  cantomon_Test
};


