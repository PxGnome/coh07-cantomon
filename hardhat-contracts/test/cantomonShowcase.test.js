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


const cantomonShowcase_Test = function () {
  let diamondCutFacet;
  // var facetCuts = [];

  var nftOwnedId = 0;


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

  // For mock testing purposes
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

  before(async function () {
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);

    const NFTReader = await ethers.getContractFactory("NftReader");
    nftReader = await NFTReader.deploy(ethers.constants.AddressZero);

    initArg = ['Cantomon', "CANTOMON", "https://pxgnome.mypinata.cloud/ipfs/QmYTPAgd3eAYdLgipvPQehwRdgUgCZwdpLdC9tWbJmi9in/"];
    diamondAddress = await deployDiamond(initArg);

    proxyERC721Facet = await ethers.getContractAt("ProxyERC721Facet", diamondAddress);
    gmFacet = await ethers.getContractAt("GMFacet", diamondAddress);
    evolutionFacet = await ethers.getContractAt("EvolutionFacet", diamondAddress);
    dojoFacet = await ethers.getContractAt("DojoFacet", diamondAddress);

    SolidStateERC721Mock = await ethers.getContractFactory("SolidStateERC721Mock");
    mockNft = await SolidStateERC721Mock.deploy('mock', 'mock', 'MOCK');
    await mockNft.mint(owner.address);

    const bytes32Value = ethers.utils.hexZeroPad(nftReader.address, 32);
    await proxyERC721Facet.setApprovedMessenger(bytes32Value);
    // await nftReader.portNftTest(0, mockNft.address, nftOwnedId, diamondAddress, {value: 1});
    portNftTest(5);

  });
    describe("Cantomon Game Tests", function () {
      before("Declare gmFacet variables", async function () {
        version = 1;
        season = 1;
        await gmFacet.setGameVersion(version);
        await gmFacet.setGameSeason(season);
  
        fees = {
          'incubateCantomon': ethers.utils.parseUnits("0.01", "ether"),
        }
  
        for (const key in fees) {
          await gmFacet.setFee(key, fees[key]);
        }
        xpRules = [1440, 2880, 4320];
  
        for(let i = 0; i < xpRules.length; i++) {
          await gmFacet.setEvolutionXpforEvo(i, xpRules[i]);
        }
        
        evoOptions = {
          0: [1, 2, 3],
          1: [4, 5, 10],
          2: [6, 7, 10],
          3: [8, 9, 10]
        }
  
        for(let i = 0; i < evoOptions.length; i++) {
          await gmFacet.setEvolutionOptions(i, evoOptions[i]);
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
        }
      });

      it("Portal", async function () {
        nftOwnedId = 0;
        //@dev -- Live Version
        // await nftReader.portNft(0, mockNft.address, nftOwnedId, {value: 1});

        //@dev -- Mock Version
        await nftReader.portNftTest(0, mockNft.address, nftOwnedId, diamondAddress, {value: 1});
          
        let eventFilter = proxyERC721Facet.filters.Transfer();
        let events = await proxyERC721Facet.queryFilter(eventFilter);
        let lastEvent = events.pop();
        cantomonId = lastEvent.args.tokenId;
        coloredLog('32', "Cantomon ID Minted: "+ cantomonId.toString());
        expect(lastEvent.args.to.toString()).to.equal(owner.address);
      });
      it("incubate", async function () {
        cantomonId = 1;
        //@dev -- Use this for incubate
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

        //@dev - Use this to get XP
        result = await evolutionFacet.getXp(cantomonId);
        expect(result).to.equal(1440);
        coloredLog('35', `Cantomon ${cantomonId} got ${result} xp`);

      });

      it("hatch", async function () {
        cantomonId = 2;
        //@dev -- Use this to get evolution stage
        expect(await evolutionFacet.getEvoStage(cantomonId)).to.equal(0);
        //@dev -- Use this to get how much XP needed for evolution
        result = await evolutionFacet.myXpForEvo(cantomonId);

        result = await evolutionFacet.getXp(cantomonId);
        coloredLog('35', `Cantomon ${cantomonId} got ${result} xp`);

        //@dev -- Use this to hatch
        await evolutionFacet.hatchCantomon(cantomonId);
        expect(await evolutionFacet.getEvoStage(cantomonId)).to.equal(1);
        evoId = await evolutionFacet.getEvolutionId(cantomonId);
        coloredLog('32', `Cantomon ID ${cantomonId} evolved into ${evoId}`);
      });

      it("feed", async function () {
        cantomonId = 1;
        //@dev -- Use this to get stats
        stats = await gmFacet.getCantomonDynamicStats(cantomonId);
        expect(stats.happiness).to.equal(0);
        expect(stats.energy).to.equal(0);
        //@dev -- Use this to feed
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
        //@dev -- Use this to train 01
        await evolutionFacet.trainCantomon_01(cantomonId);
        newStats = await gmFacet.getCantomonDynamicStats(cantomonId);
        expect(newStats.happiness).to.equal(stats.happiness.add(10));
        expect(newStats.skill).to.equal(stats.skill.add(1));
      });

      it("train 02", async function () {
        stats = await gmFacet.getCantomonDynamicStats(cantomonId);
        //@dev -- Use this to train 02
        await evolutionFacet.trainCantomon_02(cantomonId);
        newStats = await gmFacet.getCantomonDynamicStats(cantomonId);
        expect(newStats.happiness).to.equal(stats.happiness.add(10));
        
        let eventFilter = evolutionFacet.filters.TrainCantomon();
        let events = await evolutionFacet.queryFilter(eventFilter);
        let lastEvent = events.pop();

        expect(newStats.skill).to.equal(stats.skill.add(lastEvent.args.skillGrowth));
      });
      
      it("Create Dojo", async function () {
        //@dev -- Use this to create Dojo
        await dojoFacet.createDojo(cantomonId);
        expect(await dojoFacet. 
          isDojoOpen(cantomonId)).to.equal(true);
      });
      it("Register Dojo", async function () {
        //@dev -- Use this to register Dojo
        await dojoFacet.registerDojo(cantomonId);
        let eventFilter = dojoFacet.filters.RegisterDojo();
        let events = await dojoFacet.queryFilter(eventFilter);
        let lastEvent = events.pop();
        expect(lastEvent.args.cantomonId).to.equal(cantomonId);
      });
      it("dojoSelectSparring", async function () {
        dojoId = cantomonId;
        cantomonId = 1;
        //@dev -- Use this for battle
        result = await dojoFacet.dojoSelectSparring(cantomonId, dojoId);

        //@dev -- One way to get winner
        coloredLog('32', `Cantomon ID ${cantomonId} fought Dojo ID ${dojoId} with result win =  ${result}`);

        //@dev -- Another way to get winner
        let eventFilter = dojoFacet.filters.DojoBattle();
        let events = await dojoFacet.queryFilter(eventFilter);
        let lastEvent = events.pop();
        expect(lastEvent.args.cantomonId).to.equal(cantomonId);
        coloredLog('32', `Cantomon ID ${cantomonId} fought Dojo ID ${lastEvent.args.dojoId} with result win =  ${lastEvent.args.didCantomonWin}`);

      });
      it("Close Dojo", async function () {
        //@dev -- Use this to close Dojo
        await dojoFacet.closeDojo(cantomonId);
        let eventFilter = dojoFacet.filters.CloseDojo();
        let events = await dojoFacet.queryFilter(eventFilter);
        let lastEvent = events.pop();
        expect(lastEvent.args.cantomonId).to.equal(cantomonId);
      });
    });
}

module.exports = {
  cantomonShowcase_Test
};


