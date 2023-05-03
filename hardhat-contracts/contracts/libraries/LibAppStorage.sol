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
    mapping(address => bool) isApprovedForSbt;
    mapping(uint256 => ProxySbt) proxySbt;

    uint16 gameVersion;
    uint16 gameSeason;
    mapping(uint256 => Fees) fees;
    mapping(uint256 => Cantomon) cantomon;
    uint256 nextCantomonId;
    mapping(uint256 => EvolutionRule) evolutionRule;
    mapping(uint256 => Dojo) dojo;
    mapping(address => Trainer) trainer;
}


struct Fees {
    mapping(string => uint256) fee;
    string[] functionNames;
}

struct ProxySbt {
    address ogNftAddress;
    uint256 ogTokenId;
    bool isUnbound;
}

struct Cantomon {
    mapping(uint256 => CantomonMetadata) metadata;
    mapping(uint256 => CantomonBaseStats) baseStats;
    mapping(uint256 => CantomonDynamicStats) dynamicStats;
    mapping(uint256 => CantomonEvoStats) evoStats;
    mapping(uint256 => CantomonCareStats) careStats;
}

struct Trainer {
    mapping(string => uint256) itemsBalance;
    mapping(uint256 => TrainerMetadata) metadata;
}

struct TrainerMetadata {
    string name;
}


enum CantomonStatus {
    Healthy,
    Sick,
    Dead,
    AtDojo
}

enum CantomonAttr {
    Unknown,
    Pyro,
    Hydro,
    Bio
}


///@dev Metadata is assigned at minting
struct CantomonMetadata {
    string name;
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

struct CantomonEvoStats {
    uint256 evoStage;
    uint256 evolutionId;
    uint256 evoTime;
}

struct Dojo {
    mapping(uint256 => uint256[]) listofDojos;
    mapping(uint256 => bool) isRegisteredDojo;
    // mapping(uint256 => DojoMetadata) metadata;
    mapping(uint256 => DojoStats) stats;
    mapping(uint256 => DojoHistory) history;
}

// struct DojoMetadata {
//     string name;
//     address master;
// }

struct DojoStats {
    CantomonAttr attribute;
    uint256 evolutionId;
    uint256 battlePower;
    uint256 skill;
    uint256 battles;
    uint256 wins;
}

struct DojoHistory {
    mapping(uint256 => uint256) lastBattleWith;
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
            s.evolutionRule[s.gameVersion].xpForEvo[s.cantomon[s.gameVersion].evoStats[_cantomonId].evoStage] > 0, "Cantomon cannot evolve further at this point"
        );
        _;
    }
}
