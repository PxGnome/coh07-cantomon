// SPDX-License-Identifier: MIT

/// @title: Battle Logic Facet
/// @author: PxGnome
/// @notice: This contract is a proxy factory for SBTs. It is used to mint SBTs based upon messages from the bridge.
/// @dev: This is Version 0.1

pragma solidity ^0.8.19;

import "hardhat/console.sol";

import "@solidstate/contracts/access/ownable/OwnableInternal.sol";
import "@solidstate/contracts/token/ERC721/SolidStateERC721.sol";
import "../../libraries/LibAppStorage.sol";

contract EvolutionFacet is CantomonModifiers {

    function myXpForEvo(uint256 _cantomonId) public view returns (uint256) {
        uint256 evoStage = s.cantomon[s.gameVersion].evoStats[_cantomonId].evoStage;
        return s.evolutionRule[s.gameVersion].xpForEvo[evoStage];
    }

    function getEvoStage(uint256 _cantomonId) public view returns (uint256) {
        return s.cantomon[s.gameVersion].evoStats[_cantomonId].evoStage;
    }

    function getEvolutionId(uint256 _cantomonId) public view returns (uint256) {
        return s.cantomon[s.gameVersion].evoStats[_cantomonId].evolutionId;
    }
    
    function _addXp(uint256 _cantomonId, uint256 _add) internal {
        require(myXpForEvo(_cantomonId) > 0, "Cantomon cannot evolve");
        s.cantomon[s.gameVersion].dynamicStats[_cantomonId].xp += _add;
    }

    function _subXp(uint256 _cantomonId, uint256 _sub) internal {
        require(myXpForEvo(_cantomonId) > 0, "Cantomon cannot evolve");
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[s.gameVersion].dynamicStats[_cantomonId];
        c_dynamicStats.xp > _sub ? c_dynamicStats.xp -= _sub : c_dynamicStats.xp = 0;
    }

    function _addHappiness(uint256 _cantomonId, uint256 _add) internal {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[s.gameVersion].dynamicStats[_cantomonId];
        c_dynamicStats.happiness + _add > 100 ? c_dynamicStats.happiness = 100 : c_dynamicStats.happiness += _add;
    }

    function _subHappiness(uint256 _cantomonId, uint256 _sub) internal {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[s.gameVersion].dynamicStats[_cantomonId];
        c_dynamicStats.happiness > _sub ? c_dynamicStats.happiness -= _sub : c_dynamicStats.happiness = 0;
    }

    function _addEnergy(uint256 _cantomonId, uint256 _add) internal {
        s.cantomon[s.gameVersion].dynamicStats[_cantomonId].energy += _add;
    }

    function _subEnergy(uint256 _cantomonId, uint256 _sub) internal {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[s.gameVersion].dynamicStats[_cantomonId];
        c_dynamicStats.energy > _sub ? c_dynamicStats.energy -= _sub : c_dynamicStats.energy = 0;
    }

    function _addSkill(uint256 _cantomonId, uint256 _add) internal {
        s.cantomon[s.gameVersion].dynamicStats[_cantomonId].skill += _add;
    }

    function _subSkill(uint256 _cantomonId, uint256 _sub) internal {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[s.gameVersion].dynamicStats[_cantomonId];
        c_dynamicStats.skill > _sub ? c_dynamicStats.skill -= _sub : c_dynamicStats.skill = 0;
    }

    ///@dev Should be a VRF number later on but use keccak for now
    function _genSeed(uint256 _dnaNumber) public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp,_dnaNumber)));
    }

    function _xpAccrued(uint256 _cantomonId) internal view returns (uint256) {
        uint256 timeSinceEvo = block.timestamp - s.cantomon[s.gameVersion].evoStats[_cantomonId].evoTime;
        uint256 xp = timeSinceEvo / 60;
        return xp;
    }

    function getXp(uint256 _cantomonId) public view returns (uint256) {
        uint256 xp = s.cantomon[s.gameVersion].dynamicStats[_cantomonId].xp;
        uint256 xpAccrued = _xpAccrued(_cantomonId);
        return xp + xpAccrued;
    }

    function _happinessDebt(uint256 _cantomonId) internal view returns (uint256) {
        uint256 timeSinceEvo = block.timestamp - s.cantomon[s.gameVersion].evoStats[_cantomonId].evoTime;
        uint256 happinessDebt = timeSinceEvo / 3600;
        return happinessDebt;
    }

    function getHappiness(uint _cantomonId) public view returns (uint256) {
        uint256 happiness = s.cantomon[s.gameVersion].dynamicStats[_cantomonId].happiness;
        uint256 happinessDebt = _happinessDebt(_cantomonId);
        return happiness - happinessDebt;
    }

    ///@dev Allow player to instantly hatch Cantomon
    function incubateCantomon(uint256 _cantomonId) public payable onlyCantomonOwner(_cantomonId) {
        require(msg.value == s.fees[0].fee['incubateCantomon'], "Incorrect incubation fee");
        _hatchCantomon(_cantomonId);
    }

    ///@dev Check XP to hatch Cantomon
    function hatchCantomon(uint256 _cantomonId) public onlyCantomonOwner(_cantomonId) {
        require(getXp(_cantomonId) >= myXpForEvo(_cantomonId), "Cantomon needs more xp to evolve");
        _hatchCantomon(_cantomonId);
    }

    ///@dev Hatch Cantomon
    function _hatchCantomon(uint256 _cantomonId) public onlyCantomonOwner(_cantomonId) {
        CantomonEvoStats storage c_evoStats = s.cantomon[s.gameVersion].evoStats[_cantomonId];
        require(c_evoStats.evoStage == 0, "Cantomon needs to be an egg to hatch");

        ProxySbt memory proxySbt = s.proxySbt[_cantomonId];
        uint256 dna = _generateDnaNumber(proxySbt.ogNftAddress, proxySbt.ogTokenId);
        CantomonBaseStats storage c_baseStats = s.cantomon[s.gameVersion].baseStats[_cantomonId];
        c_baseStats.dna = dna;

        uint256 evolutionId = 1 + dna % 3;
        c_baseStats.attribute = CantomonAttr(evolutionId);

        uint256 seed = _genSeed(dna);
        c_baseStats.battlePower = seed % 40;
    
        s.cantomon[s.gameVersion].dynamicStats[_cantomonId].xp = 0;
        c_evoStats.evoStage = 1;
        c_evoStats.evolutionId = evolutionId;
        c_evoStats.evoTime = block.timestamp;
        emit EvolveCantomon(_cantomonId, c_evoStats.evoStage, evolutionId, c_evoStats.evoTime);
    }

    function _generateDnaNumber(address _address, uint256 _tokenId) internal view returns (uint256) {        
        uint256 hashed = uint256(keccak256(abi.encodePacked(_address, _tokenId, s.gameSeason)));
        return hashed;
    }

    event EvolveCantomon(uint256 indexed cantomonId, uint256 indexed evoStage, uint256 indexed evolutionId, uint256 evoTime);

    function evolveCantomon(uint256 _cantomonId) public onlyCantomonOwner(_cantomonId) cantomonMaxEvo(_cantomonId) {
        CantomonEvoStats storage c_evoStats = s.cantomon[s.gameVersion].evoStats[_cantomonId];
        require(c_evoStats.evoStage > 0, "Cantomon needs to hatch first");
        require(getXp(_cantomonId) >= myXpForEvo(_cantomonId), "Cantomon needs more xp to evolve");
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[s.gameVersion].dynamicStats[_cantomonId];
        EvolutionRule storage evolutionRule = s.evolutionRule[s.gameVersion];

        uint256[] memory evolutionOptions = evolutionRule.evolutionOptions[c_evoStats.evolutionId];

        EvolutionRequirements memory evolutionRequirements;
        uint256 evolutionId;
        for (uint i = 0; i < evolutionOptions.length; i++) {
            evolutionRequirements = evolutionRule.evolutionRequirements[evolutionOptions[i]];
            if(c_dynamicStats.happiness < evolutionRequirements.happiness) {
                continue;
            }
            if(c_dynamicStats.wins < evolutionRequirements.wins) {
                continue;
            }
            if(c_dynamicStats.battles < evolutionRequirements.battles) {
                continue;
            }
            evolutionId = evolutionOptions[i];
        }
        
        CantomonBaseStats storage c_baseStats = s.cantomon[s.gameVersion].baseStats[_cantomonId];

        c_baseStats.battlePower += evolutionRule.evolutionBonus[evolutionId].battlePower;
        c_dynamicStats.skill += evolutionRule.evolutionBonus[evolutionId].skill;

        c_dynamicStats.xp = 0;
        c_dynamicStats.happiness = 0;
        c_evoStats.evolutionId = evolutionId;
        c_evoStats.evoTime = block.timestamp;
        c_evoStats.evoStage += 1;
        emit EvolveCantomon(_cantomonId, c_evoStats.evoStage, evolutionId, c_evoStats.evoTime);
    }

    modifier training(uint256 _cantomonId) {
        // require(s.cantomon[_cantomonId].careStats[s.gameVersion].lastTrained + 300 < block.timestamp, "Cantomon is still training");
        s.cantomon[_cantomonId].careStats[s.gameVersion].numberTrained += 1;
        _;
    }

    event TrainCantomon(uint256 indexed trainingId, uint256 indexed cantomonId,uint256 happinessGrowth,  uint256 skillGrowth);

    function trainCantomon_01(uint256 _cantomonId) public onlyCantomonOwner(_cantomonId) training(_cantomonId) {
        _addSkill(_cantomonId, 1);
        _addHappiness(_cantomonId, 10);
        emit TrainCantomon(1, _cantomonId, 10, 1);      
    }
    
    function trainCantomon_02(uint256 _cantomonId) public onlyCantomonOwner(_cantomonId) training (_cantomonId) {
        uint256 seed = _genSeed(uint256(s.cantomon[s.gameVersion].baseStats[_cantomonId].dna));

        uint256 skillGrowth = seed % 3;
        _addSkill(_cantomonId, skillGrowth);
        _addHappiness(_cantomonId, 10);
        emit TrainCantomon(1, _cantomonId, 10, skillGrowth);
    }

    modifier feeding(uint256 _cantomonId) {
        s.cantomon[_cantomonId].careStats[s.gameVersion].lastFed = block.timestamp;
        s.cantomon[_cantomonId].careStats[s.gameVersion].numberTrained += 1;
        _;
    }

    event FeedCantomon(uint256 indexed feedingId, uint256 indexed cantomonId, uint256 happinessGrowth,  uint256 energyGrowth);


    function feedCantomon_01(uint256 _cantomonId) public onlyCantomonOwner( _cantomonId) feeding(_cantomonId) {
        _addHappiness(_cantomonId, 10);
        _addEnergy(_cantomonId, 1);
        emit FeedCantomon(1, _cantomonId, 10, 1);
    }
}
