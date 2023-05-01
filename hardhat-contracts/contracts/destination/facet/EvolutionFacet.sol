// SPDX-License-Identifier: MIT

/// @title: Battle Logic Facet
/// @author: PxGnome
/// @notice: This contract is a proxy factory for SBTs. It is used to mint SBTs based upon messages from the bridge.
/// @dev: This is Version 0.1

pragma solidity ^0.8.19;

// import "hardhat/console.sol";

import "@solidstate/contracts/access/ownable/OwnableInternal.sol";
import "@solidstate/contracts/token/ERC721/SolidStateERC721.sol";
import "../../libraries/LibAppStorage.sol";

contract EvolutionFacet is CantomonModifiers {

    function myXpForEvo(uint256 _cantomonId) public view returns (uint256) {
        return getXpForEvo(s.cantomon[_cantomonId].evoStats[s.gameVersion].evoStage);
    }

    function getXpForEvo(uint256 _level) public view returns (uint256) {
        return s.evolutionRule[s.gameSettings.evolutionRule].xpForEvo[_level];
    }
    
    function _addXp(uint256 _cantomonId, uint256 _add) internal {
        require(myXpForEvo(_cantomonId) > 0, "Cantomon cannot evolve");
        s.cantomon[_cantomonId].dynamicStats[s.gameVersion].xp += _add;
    }

    function _subXp(uint256 _cantomonId, uint256 _sub) internal {
        require(myXpForEvo(_cantomonId) > 0, "Cantomon cannot evolve");
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[_cantomonId].dynamicStats[s.gameVersion];
        c_dynamicStats.xp > _sub ? c_dynamicStats.xp -= _sub : c_dynamicStats.xp = 0;
    }

    function _addHappiness(uint256 _cantomonId, uint256 _add) internal {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[_cantomonId].dynamicStats[s.gameVersion];
        c_dynamicStats.happiness + _add > 100 ? c_dynamicStats.happiness = 100 : c_dynamicStats.happiness += _add;
    }

    function _subHappiness(uint256 _cantomonId, uint256 _sub) internal {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[_cantomonId].dynamicStats[s.gameVersion];
        c_dynamicStats.happiness > _sub ? c_dynamicStats.happiness -= _sub : c_dynamicStats.happiness = 0;
    }

    function _addEnergy(uint256 _cantomonId, uint256 _add) internal {
        s.cantomon[_cantomonId].dynamicStats[s.gameVersion].energy += _add;
    }

    function _subEnergy(uint256 _cantomonId, uint256 _sub) internal {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[_cantomonId].dynamicStats[s.gameVersion];
        c_dynamicStats.energy > _sub ? c_dynamicStats.energy -= _sub : c_dynamicStats.energy = 0;
    }

    function _addSkill(uint256 _cantomonId, uint256 _add) internal {
        s.cantomon[_cantomonId].dynamicStats[s.gameVersion].skill += _add;
    }

    function _subSkill(uint256 _cantomonId, uint256 _sub) internal {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[_cantomonId].dynamicStats[s.gameVersion];
        c_dynamicStats.skill > _sub ? c_dynamicStats.skill -= _sub : c_dynamicStats.skill = 0;
    }

    ///@dev Should be a VRF number later on but use keccak for now
    function _genSeed(uint256 _dnaNumber) public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.timestamp,_dnaNumber)));
    }

    function _xpAccrued(uint256 _cantomonId) internal view returns (uint256) {
        uint256 timeSinceEvo = block.timestamp - s.cantomon[_cantomonId].evoStats[s.gameVersion].evoTime;
        uint256 xp = timeSinceEvo / 60;
        return xp;
    }

    function getXp(uint256 _cantomonId) public view returns (uint256) {
        uint256 xp = s.cantomon[_cantomonId].dynamicStats[s.gameVersion].xp;
        uint256 xpAccrued = _xpAccrued(_cantomonId);
        return xp + xpAccrued;
    }

    function _happinessDebt(uint256 _cantomonId) internal view returns (uint256) {
        uint256 timeSinceEvo = block.timestamp - s.cantomon[_cantomonId].evoStats[s.gameVersion].evoTime;
        uint256 happinessDebt = timeSinceEvo / 3600;
        return happinessDebt;
    }

    function getHappiness(uint _cantomonId) public view returns (uint256) {
        uint256 happiness = s.cantomon[_cantomonId].dynamicStats[s.gameVersion].happiness;
        uint256 happinessDebt = _happinessDebt(_cantomonId);
        return happiness - happinessDebt;
    }

    ///@dev Hatch Cantomon
    function hatchCantomon(uint256 _cantomonId) public {
        require(s.cantomon[_cantomonId].dynamicStats[s.gameVersion].xp >= myXpForEvo(_cantomonId), "Cantomon needs more xp to evolve");

        ProxySbt memory proxySbt = s.proxySbt[_cantomonId];
        uint256 dna = _generateDnaNumber(proxySbt.ogNftAddress, proxySbt.ogTokenId);
        CantomonBaseStats storage c_baseStats = s.cantomon[_cantomonId].baseStats[s.gameVersion];
        c_baseStats.dna = dna;

        uint256 evolutionId = 1 + dna % 3;
        c_baseStats.attribute = CantomonAttr(evolutionId);

        uint256 seed = _genSeed(dna);
        c_baseStats.battlePower = seed % 40;
    
        s.cantomon[_cantomonId].evoStats[s.gameVersion].evoStage = 1;
        s.cantomon[_cantomonId].evoStats[s.gameVersion].evolutionId = evolutionId;
    }

    function _generateDnaNumber(address _address, uint256 _tokenId) internal view returns (uint256) {        
        uint256 hashed = uint256(keccak256(abi.encodePacked(_address, _tokenId, s.gameSeason)));
        return hashed;
    }

    function evolveCantomon(uint256 _cantomonId) public onlyCantomonOwner(_cantomonId) cantomonMaxEvo(_cantomonId) {
        require(myXpForEvo(_cantomonId) > 0, "Cantomon cannot evolve");
        CantomonEvoStats storage c_evoStats = s.cantomon[_cantomonId].evoStats[s.gameVersion];
        require(c_evoStats.evoStage > 0, "Cantomon needs to hatch first");
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[_cantomonId].dynamicStats[s.gameVersion];

        require(c_dynamicStats.xp >= myXpForEvo(_cantomonId), "Cantomon needs more xp to evolve");

        EvolutionRule storage evolutionRule = s.evolutionRule[s.gameSettings.evolutionRule];

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
        
        CantomonBaseStats storage c_baseStats = s.cantomon[_cantomonId].baseStats[s.gameVersion];

        c_baseStats.battlePower += evolutionRule.evolutionBonus[evolutionId].battlePower;
        c_dynamicStats.skill += evolutionRule.evolutionBonus[evolutionId].skill;

        c_dynamicStats.xp = 0;
        c_dynamicStats.happiness = 0;
        c_evoStats.evolutionId = evolutionId;
        c_evoStats.evoStage += 1;
    }

    modifier training(uint256 _cantomonId) {
        require(s.cantomon[_cantomonId].careStats[s.gameVersion].lastTrained + 300 < block.timestamp, "Cantomon is still training");
        s.cantomon[_cantomonId].careStats[s.gameVersion].numberTrained += 1;
        _;
    }
    function trainCantomon_01(uint256 _cantomonId) public onlyCantomonOwner(_cantomonId) training (_cantomonId) {
        _addSkill(_cantomonId, 1);
        _addHappiness(_cantomonId, 10);        
    }
    function trainCantomon_02(uint256 _cantomonId) public onlyCantomonOwner(_cantomonId) training (_cantomonId) {
        uint256 seed = _genSeed(uint256(s.cantomon[_cantomonId].baseStats[s.gameVersion].dna));

        _addSkill(_cantomonId, seed % 3);
        _addHappiness(_cantomonId, 10);        
    }

    modifier feeding(uint256 _cantomonId) {
        s.cantomon[_cantomonId].careStats[s.gameVersion].lastFed = block.timestamp;
        s.cantomon[_cantomonId].careStats[s.gameVersion].numberTrained += 1;
        _;
    }
    function feedCantomon_01(uint256 _cantomonId) public onlyCantomonOwner( _cantomonId) feeding(_cantomonId) {
        _addHappiness(_cantomonId, 10);
        _addEnergy(_cantomonId, 1);
    }
}
