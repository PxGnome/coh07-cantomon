// SPDX-License-Identifier: MIT

/// @title: AppStorage for Cantomon
/// @author: PxGnome
/// @notice: Contract used for Cantomon project
/// @dev: This is Version 0.1

pragma solidity ^0.8.19;

import "@hyperlane-xyz/core/contracts/interfaces/IMailbox.sol";
import "@solidstate/contracts/interfaces/IERC721.sol";
import "@solidstate/contracts/access/ownable/OwnableInternal.sol";

struct AppStorage {
    IMailbox inbox;
    bytes32 lastSender;
    string lastMessage;
    bytes32 approvedMessenger;
    mapping(uint256 => ProxySbt) proxySbt;

    uint16 gameVersion;
    uint16 gameSeason;
    GameSettings gameSettings;
    mapping(uint256 => Cantomon) cantomon;
    uint256 nextCantomonId;
    mapping(uint256 => EvolutionRule) evolutionRule;
    mapping(uint256 => NPC) npc;
}

struct Cantomon {
    mapping(uint256 => CantomonMetaData) metadata;
    mapping(uint256 => CantomonBaseStats) baseStats;
    mapping(uint256 => CantomonDynamicStats) dynamicStats;
    mapping(uint256 => CantomonEvoStats) evoStats;
    mapping(uint256 => CantomonCareStats) careStats;
}


struct ProxySbt {
    address ogNftAddress;
    uint256 ogTokenId;
    bool isUnbound;
}

struct GameSettings {
    uint16 evolutionRule;
}

enum CantomonStatus {
    Healthy,
    Sick,
    Dead
}

enum CantomonAttr {
    Unknown,
    Fire,
    Water,
    Grass
}


///@dev Metadata is assigned at minting
struct CantomonMetaData {
    uint256 tokenId;
}

///@dev BaseStats is assigned at hatching and should be immutable
struct CantomonBaseStats {
    uint256 dna;
    CantomonAttr attribute;
    uint256 battlePower;
    uint256 birthTime;
    // uint256 hp;
    // uint256 attack;
    // uint256 speed;
    // uint256 specialAttack;
}

///@dev Metadata is tied to season
struct CantomonDynamicStats {
    CantomonStatus status;
    uint256 xp;
    uint256 happiness;
    uint256 skill;
    uint256 energy;
    uint256 battles;
    uint256 wins;
}
struct CantomonCareStats {
    uint256 lastFed;
    uint256 lastTrained;
    uint256 numberTrained;
    uint256 numberFed;
}

struct NPC {
    mapping(string => uint256) npcNameToId;
    mapping(uint256 => string) npcIdToName;
    mapping(uint256 => NPCStats) npcStats;
}

struct NPCStats {
    CantomonAttr attribute;
    uint256 evolutionId;
    uint256 battlePower;
    uint256 npcSkill;
    uint256 npcBattles;
    uint256 npcWins;
}

struct CantomonEvoStats {
    uint256 evoStage;
    uint256 evolutionId;
    uint256 evoTime;
}

///@dev Need to assign this at init
struct EvolutionRule {
    mapping(uint256 => uint256) xpForEvo;
    mapping(uint256 => uint256[]) evolutionOptions;
    mapping(uint256 => EvolutionRequirements) evolutionRequirements;
    mapping(uint256 => EvolutionBonus) evolutionBonus;
}

struct EvolutionRequirements {
    uint256 evolutionId;
    uint256 happiness;
    uint256 wins;
    uint256 battles;
}
struct EvolutionBonus {
    uint256 battlePower;
    uint256 skill;
}


library LibAppStorage {
    function diamondStorage() internal pure returns (AppStorage storage ds) {
        assembly {
            ds.slot := 0
        }
    }
}

contract CantomonModifiers is OwnableInternal {
    AppStorage internal s;

    modifier onlyCantomonOwner(uint256 _cantomonId) {
        require(
            IERC721(address(this)).ownerOf(_cantomonId) == msg.sender,
            "Not NFT owner"
        );
        _;
    }

    modifier cantomonMaxEvo(uint256 _cantomonId) {
        require(
            s.evolutionRule[s.gameSettings.evolutionRule].xpForEvo[s.cantomon[_cantomonId].evoStats[s.gameVersion].evoStage] > 0, "Cantomon cannot evolve further at this point"
        );
        _;
    }
}
