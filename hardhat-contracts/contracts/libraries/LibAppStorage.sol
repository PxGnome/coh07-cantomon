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
    // mapping(uint256 => CantomonMetaData) cantomonMetaData;
    // mapping(uint256 => CantomonBaseStats) cantomonBaseStats;
    // mapping(uint256 => CantomonDynamicStats) cantomonDynamicStats;
    mapping(uint256 => EvolutionRule) evolutionRule;
}

struct Cantomon {
    mapping(uint256 => CantomonMetaData) metadata;
    mapping(uint256 => CantomonBaseStats) baseStats;
    mapping(uint256 => CantomonDynamicStats) dynamicStats;
}


struct ProxySbt {
    address ogNftAddress;
    uint256 ogTokenId;
    bool isUnbound;
}

struct GameSettings {
    // uint16 metaData_v;
    // uint16 baseStats_v;
    // uint16 dynamicStats_v;
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
    CantomonAttr attribute;
    uint256 battlePower;
    bytes32 dna;

    // uint256 hp;
    // uint256 attack;
    // uint256 speed;
    // uint256 specialAttack;
}

///@dev Metadata is tied to season
struct CantomonDynamicStats {
    uint256 evoStage;
    uint256 evolution;
    CantomonStatus status;
    uint256 xp;
    uint256 happiness;
    uint256 fitness;
    uint256 energy;
}

///@dev Need to assign this at init
struct EvolutionRule {
    mapping(uint256 => uint256) xpForEvo;
    uint16 numberOfEvolutions; 
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
            s.evolutionRule[s.gameSettings.evolutionRule].xpForEvo[s.cantomon[_cantomonId].dynamicStats[s.gameVersion].evoStage] > 0, "Cantomon cannot evolve further at this point"
        );
        _;
    }
}
