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

contract DojoFacet is CantomonModifiers {

    function isDojoOpen(uint256 _dojoId) external view returns (bool) {
        CantomonStatus status = s.cantomon[s.gameVersion].dynamicStats[_dojoId].status;
        return status == CantomonStatus.AtDojo ? true : false;
    }

    function getListOfDojos() external view returns (uint256[] memory) {
        return s.dojo[s.gameVersion].listofDojos[s.gameVersion];
    }    

    function createDojo(uint256 _cantomonId) public onlyCantomonOwner(_cantomonId) {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[s.gameVersion].dynamicStats[_cantomonId];
        require(c_dynamicStats.status != CantomonStatus.AtDojo, "Cantomon already has a dojo");
        // Trainer storage trainer = s.trainer[msg.sender];
        // require(trainer.itemsBalance['dojoPass'] > 0, "Trainer needs to have a dojo pass");

        CantomonBaseStats storage c_baseStats = s.cantomon[s.gameVersion].baseStats[_cantomonId];

        DojoStats storage dojoStats = s.dojo[s.gameVersion].stats[_cantomonId];
        
        dojoStats.attribute = c_baseStats.attribute;
        dojoStats.skill = c_dynamicStats.skill;
        dojoStats.battlePower = c_baseStats.battlePower;
        dojoStats.evolutionId = s.cantomon[s.gameVersion].evoStats[_cantomonId].evolutionId;

        c_dynamicStats.status = CantomonStatus.AtDojo;
        // trainer.itemsBalance['dojoPass'] -= 1;
    }

    event RegisterDojo(uint256 indexed cantomonId);
    function registerDojo(uint256 _cantomonId) external {
        Dojo storage dojo = s.dojo[s.gameVersion];
        dojo.listofDojos[s.gameVersion].push(_cantomonId);
        dojo.isRegisteredDojo[_cantomonId] = true;
        emit RegisterDojo(_cantomonId);
    }

    event CloseDojo(uint256 indexed cantomonId);
    function closeDojo(uint256 _cantomonId) external onlyCantomonOwner(_cantomonId) {
        Dojo storage dojo = s.dojo[s.gameVersion];
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[s.gameVersion].dynamicStats[_cantomonId];
        c_dynamicStats.status = CantomonStatus.Healthy;
        c_dynamicStats.xp += dojo.stats[_cantomonId].battles;
        c_dynamicStats.skill += dojo.stats[_cantomonId].wins / 2;

        if(dojo.isRegisteredDojo[_cantomonId]) {
            for(uint256 i = 0; i < dojo.listofDojos[s.gameVersion].length; i++) {
                if(dojo.listofDojos[s.gameVersion][i] == _cantomonId) {
                    dojo.listofDojos[s.gameVersion][i] = dojo.listofDojos[s.gameVersion][dojo.listofDojos[s.gameVersion].length - 1];
                    dojo.listofDojos[s.gameVersion].pop();
                    break;
                }
            }
            dojo.isRegisteredDojo[_cantomonId] = false;
        }

        emit CloseDojo(_cantomonId);
    }

    function dojoSelectSparring(uint256 _cantomonId, uint256 _dojoId) external onlyCantomonOwner(_cantomonId) returns(bool) {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[s.gameVersion].dynamicStats[_cantomonId];
        require(c_dynamicStats.energy > 0, "Cantomon has no energy");
        bool  result = _dojoBattle(_cantomonId, _dojoId);
        if(result) {
            c_dynamicStats.skill += 2;
            return true;
        } else {
            return false;
        }
    }

    function dojoRandomSparring(uint256 _cantomonId) external onlyCantomonOwner(_cantomonId) returns (bool) {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[s.gameVersion].dynamicStats[_cantomonId];
        require(c_dynamicStats.energy > 0, "Cantomon has no energy");
        uint256 seed = _genSeed("dojoRandomSparring");
        uint256 numberOfdojos = s.dojo[s.gameVersion].listofDojos[s.gameVersion].length;
        bool result = _dojoBattle(_cantomonId, seed % numberOfdojos);
        if(result) {
            c_dynamicStats.skill += 3;
            c_dynamicStats.energy -= 1;
            return true;
        } else {
            return false;
        }
    }

    event DojoBattle(uint256 indexed cantomonId, uint256 indexed dojoId, bool didCantomonWin);

    function _dojoBattle(uint256 _cantomonId, uint256 _dojoId) internal returns(bool won) {
        CantomonDynamicStats storage c_dynamicStats = s.cantomon[s.gameVersion].dynamicStats[_cantomonId];
        require(c_dynamicStats.energy > 0, "Cantomon has no energy");

        CantomonBaseStats storage c_baseStats = s.cantomon[s.gameVersion].baseStats[_cantomonId];

        DojoStats storage dojoStats = s.dojo[s.gameVersion].stats[_dojoId];
        DojoHistory storage dojoHistory = s.dojo[s.gameVersion].history[_dojoId];
        
        uint256 attributeMultiplierBps;

        if (c_baseStats.attribute == dojoStats.attribute) {
            attributeMultiplierBps = 10_000;
        } else if (c_baseStats.attribute == CantomonAttr.Pyro) {
            if(dojoStats.attribute == CantomonAttr.Hydro) {
                attributeMultiplierBps = 8_000;
            } else if (dojoStats.attribute == CantomonAttr.Bio) {
                attributeMultiplierBps = 12_000;
            }
        } else if (c_baseStats.attribute == CantomonAttr.Hydro) {
            if(dojoStats.attribute == CantomonAttr.Pyro) {
                attributeMultiplierBps = 12_000;
            } else if (dojoStats.attribute == CantomonAttr.Bio) {
                attributeMultiplierBps = 8_000;
            }
        } else if (c_baseStats.attribute == CantomonAttr.Bio) {
            if(dojoStats.attribute == CantomonAttr.Hydro) {
                attributeMultiplierBps = 12_000;
            } else if (dojoStats.attribute == CantomonAttr.Pyro) {
                attributeMultiplierBps = 8_000;
            }            
        }

        uint256 cantomonDamage = (c_baseStats.battlePower * attributeMultiplierBps/10_000 + c_dynamicStats.skill);
        uint256 dojoDamage = dojoStats.battlePower + dojoStats.skill;

        uint256 winnerProbability = (cantomonDamage / (cantomonDamage + dojoDamage));
        uint256 seed = _genSeed("_dojoBattle");
        seed = seed % 10_000;
        if(winnerProbability > seed) {
            c_dynamicStats.wins += 1;
            won = true;
        } else {
            dojoStats.wins += 1;
            won = false;
        }

        dojoHistory.lastBattleWith[_cantomonId] = block.timestamp;
        dojoStats.battles += 1;
        c_dynamicStats.battles += 1;

        emit DojoBattle(_cantomonId, _dojoId, won);
    }


}
