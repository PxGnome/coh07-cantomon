// SPDX-License-Identifier: MIT

/// @title: SBT Proxy Factory
/// @author: PxGnome
/// @notice: This contract is a proxy factory for SBTs. It is used to mint SBTs based upon messages from the bridge.
/// @dev: This is Version 0.1

pragma solidity ^0.8.19;

// import "hardhat/console.sol";

import "@hyperlane-xyz/core/contracts/interfaces/IMailbox.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "@solidstate/contracts/access/ownable/OwnableInternal.sol";
import "@solidstate/contracts/token/ERC721/SolidStateERC721.sol";


// OwnableInternal

contract BattleFacet is OwnableInternal, SolidStateERC721 {
   bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("ProxyFactory.storage");

    struct ProxyFactoryStorage {
        IMailbox inbox;
        bytes32 lastSender;
        string lastMessage;
        bytes32 approvedMessenger;
        uint256 currentTokenId;
        mapping(uint256 => ProxySbt) proxySbt;
        mapping(uint256 => GameInfo) gameInfo;
    }

    struct ProxySbt {
        address ogNftAddress;
        uint256 ogTokenId;
        bool isUnbound;
        // bool isDead;
        // uint256 battlePower; // Should be in another facet
    }

    struct GameInfo {
        uint16 version;
        uint16 season;
    }

    function diamondStorage() internal pure returns (ProxyFactoryStorage storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
    }




    /// Constructor
    // constructor(
    //     string memory _name,
    //     string memory _symbol,
    //     address _inbox,
    //     bytes32 _approvedMessenger
    // ) ERC721(_name, _symbol) {
    //     inbox = IMailbox(_inbox);
    //     approvedMessenger = _approvedMessenger;
    // }

    //MESSAGE RELAYING (HYPERLANE) BELOW
    function setApprovedMessenger(bytes32 _addr) public onlyOwner {
        ProxyFactoryStorage storage ds = diamondStorage();
        ds.approvedMessenger = _addr;
    }

    event ReceivedMessage(uint32 origin, bytes32 sender, bytes message);

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) external {
        ProxyFactoryStorage storage ds = diamondStorage();

        require(_sender == ds.approvedMessenger, "ProxySbtFactory: Not approved messenger");
        (address _to, address nftAddress, uint256 tokenId) = abi.decode(
            _message,
            (address, address, uint256)
        );

        _mint(_to, ds.currentTokenId);

        ds.proxySbt[ds.currentTokenId] = ProxySbt({
            ogNftAddress: nftAddress,
            ogTokenId: tokenId,
            isUnbound: false
        });

        ds.currentTokenId = ds.currentTokenId + 1;
        emit ReceivedMessage(_origin, _sender, _message);
    }

    // OWNER FUNCTIONS BELOW
    ///@dev owner can call any function on this contract
    function ownerCalls(bytes memory _abi, string memory _functionSignature) external onlyOwner {
        (bool success, ) = address(this).call(abi.encodeWithSignature(_functionSignature));
        require(success, "Failed to call function");
    }


    //SOULBOUND BELOW
    event SwitchUnbound(uint256 _tokenId, bool _switch);
    function switchUnbound(uint256 _tokenId) external onlyOwner {
        _switchUnbound(_tokenId, true);
    }

    function _switchUnbound(uint256 _tokenId, bool _switch) internal {
        diamondStorage().proxySbt[_tokenId].isUnbound = _switch;
        emit SwitchUnbound(_tokenId, _switch);
    }
    
    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal virtual override(SolidStateERC721) {
        if (!diamondStorage().proxySbt[_tokenId].isUnbound) {
            require(
                _from == address(0) || _to == address(0),
                "ProxySbtFactory: This a Soulbound token. It cannot be transferred."
            );
        }
        super._beforeTokenTransfer(_from, _to, _tokenId);
    }

    // STOP HERE


    //GAME LOGIC BELOW

    // function getOriginalTokenAddress(
    //     uint256 _tokenId
    // ) public view returns (address) {
    //     return tokenIdToOriginalAddress[_tokenId];
    // }

    ///@dev to find out NFT type
    // function getNftType(uint256 _tokenId) public view returns (uint256) {
    //     uint256 tokenTypeId = (uint256(keccak256(abi.encodePacked(_tokenId)))) %
    //         (4);
    //     return tokenTypeId;
    // }

}
