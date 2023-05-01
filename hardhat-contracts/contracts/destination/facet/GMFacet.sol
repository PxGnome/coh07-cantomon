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
    function setGameSettings(GameSettings calldata _gameSettings) external onlyOwner {
        s.gameSettings = _gameSettings;
    }
    function getGameSettings() external view returns (GameSettings memory) {
        return s.gameSettings;
    }
    //Evolution Settings
    function setEvolutionXpforEvo(uint256 _evoStage, uint256 _xpRequired) external onlyOwner {
        s.evolutionRule[s.gameSettings.evolutionRule].xpForEvo[_evoStage] = _xpRequired;
    }
    function getEvolutionXpforEvo(uint256 _evoStage) external view returns (uint256) {
        return s.evolutionRule[s.gameSettings.evolutionRule].xpForEvo[_evoStage];
    }
    function setEvolutionOptions(uint256 _evolutionId, uint256[] calldata _evoOptions) external onlyOwner {
        s.evolutionRule[s.gameSettings.evolutionRule].evolutionOptions[_evolutionId] = _evoOptions;
    }
    function getEvolutionOptions(uint256 _evolutionId) external view returns (uint256[] memory) {
        return s.evolutionRule[s.gameSettings.evolutionRule].evolutionOptions[_evolutionId];
    }
    function setEvolutionRequirements(uint256 _evolutionId, EvolutionRequirements calldata _evoReq) external onlyOwner {
        s.evolutionRule[s.gameSettings.evolutionRule].evolutionRequirements[_evolutionId] = _evoReq;
    }
    function getEvolutionRequirements(uint256 _evolutionId) external view returns (EvolutionRequirements memory) {
        return s.evolutionRule[s.gameSettings.evolutionRule].evolutionRequirements[_evolutionId];
    }
    function setEvolutionBonus(uint256 _evolutionId, EvolutionBonus calldata _evoBonus) external onlyOwner {
        s.evolutionRule[s.gameSettings.evolutionRule].evolutionBonus[_evolutionId] = _evoBonus;
    }
    function getEvolutionBonus(uint256 _evolutionId) external view returns (EvolutionBonus memory) {
        return s.evolutionRule[s.gameSettings.evolutionRule].evolutionBonus[_evolutionId];
    }
    
}
