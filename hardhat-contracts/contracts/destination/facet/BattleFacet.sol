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

contract BattleFacet is CantomonModifiers {
    function battleNPC(uint256 _cantomonId, uint256 _npcId) external onlyCantomonOwner(_cantomonId) {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[_cantomonId].dynamicStats[s.gameVersion];
        require(c_dynamicStats.energy > 0, "Cantomon has no energy");

        CantomonBaseStats storage c_baseStats = s.cantomon[_cantomonId].baseStats[s.gameVersion];
        CantomonEvoStats storage c_evoStats = s.cantomon[_cantomonId].evoStats[s.gameVersion];

        NPCStats storage npcStats = s.npc[_npcId].npcStats[s.gameVersion];

        c_dynamicStats.energy -= 1;
    }
}
