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
        return getXpForEvo(s.cantomon[_cantomonId].dynamicStats[s.gameVersion].evoStage);
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
        s.cantomon[_cantomonId].dynamicStats[s.gameVersion].happiness += _add;
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

    function _hatchCantomon(uint256 _cantomonId) internal {
        ProxySbt memory proxySbt = s.proxySbt[_cantomonId];
        bytes32 dna = _generateDNAHash(proxySbt.ogNftAddress, proxySbt.ogTokenId);
        s.cantomon[_cantomonId].baseStats[s.gameVersion].dna = dna;
        uint256 dnaNumber = uint256(dna);
        
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[_cantomonId].dynamicStats[s.gameVersion];

        // Generate Type
        // Generate Stats
        // Need to generate battlepower
        // Need to generate type
        // address _ogNftaddress = proxySbt[_cantomonId].ogNftAddress;
    }

    function _generateDNAHash(address _address, uint256 _tokenId) internal view returns (bytes32) {        
        bytes32 hashed = keccak256(abi.encodePacked(_address, _tokenId, s.gameSeason));
        return hashed;
    }

    function evolveCantomon(uint256 _cantomonId) public onlyCantomonOwner(_cantomonId) {
        require(myXpForEvo(_cantomonId) > 0, "Cantomon cannot evolve");

        CantomonDynamicStats storage c_dynamicStats = s.cantomon[_cantomonId].dynamicStats[s.gameVersion];
        require(c_dynamicStats.xp >= myXpForEvo(_cantomonId), "Cantomon needs xp to evolve");

        c_dynamicStats.xp = 0;
        c_dynamicStats.evoStage += 1;
        // Need to generate evolution which controls apperance
    }

    function trainCantomon(uint256 _cantomonId) public onlyCantomonOwner(_cantomonId) {
        // Need to increase battlepower?

        _addHappiness(_cantomonId, 1);        
    }

    function feedCantomon(uint256 _cantomonId) public onlyCantomonOwner( _cantomonId) {


        _addEnergy(_cantomonId, 1);
    }
}
