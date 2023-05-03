// SPDX-License-Identifier: MIT

/// @title: Battle Logic Facet
/// @author: PxGnome
/// @notice: This contract is a proxy factory for SBTs. It is used to mint SBTs based upon messages from the bridge.
/// @dev: This is Version 0.1

pragma solidity ^0.8.19;

// import "hardhat/console.sol"; // TODO: remove in final

import "@solidstate/contracts/access/ownable/OwnableInternal.sol";
import "@solidstate/contracts/token/ERC721/SolidStateERC721.sol";
import "../../libraries/LibAppStorage.sol";

contract GMFacet is CantomonModifiers {
    //General Game Settings
    function setGameVersion(uint16 _gameVersion) external onlyOwner {
        s.gameVersion = _gameVersion;
    }
    function getGameVersion() external view returns (uint16) {
        return s.gameVersion;
    }
    function setGameSeason(uint16 _gameSeason) external onlyOwner {
        s.gameSeason = _gameSeason;
    }
    function getGameSeason() external view returns (uint16) {
        return s.gameSeason;
    }
    function setFee(string memory _functionName, uint256 _fee) external onlyOwner {
        s.fees[0].fee[_functionName] = _fee;
        s.fees[0].functionNames.push(_functionName);
    }
    function getFee(string memory _functionName) external view returns (uint256) {
        return s.fees[0].fee[_functionName];
    }
    //Evolution Settings
    function setEvolutionXpforEvo(uint256 _evoStage, uint256 _xpRequired) external onlyOwner {
        s.evolutionRule[s.gameVersion].xpForEvo[_evoStage] = _xpRequired;
    }
    function getEvolutionXpforEvo(uint256 _evoStage) external view returns (uint256) {
        return s.evolutionRule[s.gameVersion].xpForEvo[_evoStage];
    } 
    function setEvolutionOptions(uint256 _evolutionId, uint256[] calldata _evoOptions) external onlyOwner {
        s.evolutionRule[s.gameVersion].evolutionOptions[_evolutionId] = _evoOptions;
    }
    function getEvolutionOptions(uint256 _evolutionId) external view returns (uint256[] memory) {
        return s.evolutionRule[s.gameVersion].evolutionOptions[_evolutionId];
    }
    function setEvolutionRequirements(uint256 _evolutionId, EvolutionRequirements calldata _evoReq) external onlyOwner {
        s.evolutionRule[s.gameVersion].evolutionRequirements[_evolutionId] = _evoReq;
    }
    function getEvolutionRequirements(uint256 _evolutionId) external view returns (EvolutionRequirements memory) {
        return s.evolutionRule[s.gameVersion].evolutionRequirements[_evolutionId];
    }
    function setEvolutionBonus(uint256 _evolutionId, EvolutionBonus calldata _evoBonus) external onlyOwner {
        s.evolutionRule[s.gameVersion].evolutionBonus[_evolutionId] = _evoBonus;
    }
    function getEvolutionBonus(uint256 _evolutionId) external view returns (EvolutionBonus memory) {
        return s.evolutionRule[s.gameVersion].evolutionBonus[_evolutionId];
    }

    function getCantomonMetadata(uint256 _cantomonId) external view returns (CantomonMetadata memory) {
        return s.cantomon[s.gameVersion].metadata[_cantomonId];
    }
    function getCantomonBaseStats(uint256 _cantomonId) external view returns (CantomonBaseStats memory) {
        return s.cantomon[s.gameVersion].baseStats[_cantomonId];
    }
    function getCantomonDynamicStats(uint256 _cantomonId) external view returns (CantomonDynamicStats memory) {
        return s.cantomon[s.gameVersion].dynamicStats[_cantomonId];
    }
    function getCantomonEvoStats(uint256 _cantomonId) external view returns (CantomonEvoStats memory) {
        return s.cantomon[s.gameVersion].evoStats[_cantomonId];
    }
    function getCantomonCareerStats(uint256 _cantomonId) external view returns (CantomonCareStats memory) {
        return s.cantomon[_cantomonId].careStats[s.gameVersion];
    }

    // function getDojoMetadata(uint256 _dojoId) external view returns (DojoMetadata memory) {
    //     return s.dojo[s.gameVersion].metadata[_dojoId];
    // }
    // function getDojoStats(uint256 _dojoId) external view returns (DojoStats memory) {
    //     return s.dojo[s.gameVersion].stats[_dojoId];
    // }
}
