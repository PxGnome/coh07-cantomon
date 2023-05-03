// SPDX-License-Identifier: MIT

/// @title: Proxy ERC721 Facet
/// @author: PxGnome
/// @notice: This contract is a proxy factory for SBTs. It is used to mint SBTs based upon messages from the bridge.
/// @dev: This is Version 0.1

pragma solidity ^0.8.19;

import "hardhat/console.sol";

import "@hyperlane-xyz/core/contracts/interfaces/IMailbox.sol";
import "@solidstate/contracts/token/ERC721/SolidStateERC721.sol";
import { ERC721MetadataStorage } from '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';
import { IERC721Metadata } from '@solidstate/contracts/token/ERC721/metadata/IERC721Metadata.sol';

import "../../libraries/LibAppStorage.sol";

contract ProxyERC721Facet is CantomonModifiers, SolidStateERC721 {
    //MESSAGE RELAYING (HYPERLANE) BELOW
    function setApprovedMessenger(bytes32 _addr) external onlyOwner {
        s.approvedMessenger = _addr;
    }

    event ReceivedMessage(uint32 origin, bytes32 sender, bytes message);

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) external {
        require(_sender == s.approvedMessenger, "ProxySbtFactory: Not approved messenger");
        (address _to, address _ogNftAddress, uint256 _ogTokenId) = abi.decode(
            _message,
            (address, address, uint256)
        );

        uint256 cantomonId = s.nextCantomonId;

        _mint(_to, cantomonId);

        s.proxySbt[cantomonId] = ProxySbt({
            ogNftAddress: _ogNftAddress,
            ogTokenId: _ogTokenId,
            isUnbound: false
        });

        s.cantomon[s.gameVersion].evoStats[cantomonId].evoTime = block.timestamp;
        s.nextCantomonId = cantomonId + 1;
        emit ReceivedMessage(_origin, _sender, _message);
    }

    //SOULBOUND BELOW
    event SwitchUnbound(uint256 _tokenId, bool _switch);
    function switchUnbound(uint256 _tokenId) external onlyOwner {
        _switchUnbound(_tokenId, true);
    }

    function _switchUnbound(uint256 _tokenId, bool _switch) internal {
        s.proxySbt[_tokenId].isUnbound = _switch;
        emit SwitchUnbound(_tokenId, _switch);
    }
    
    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal virtual override(SolidStateERC721) {
        if (!s.proxySbt[_tokenId].isUnbound) {
            if(!s.isApprovedForSbt[_from] && !s.isApprovedForSbt[_to] && _from != address(0) && _to != address(0)) {
                revert("ProxySbtFactory: This a Soulbound token. It cannot be transferred.");
            }
        }
        super._beforeTokenTransfer(_from, _to, _tokenId);
    }

    function setApprovedForSbtTransfer(address _address, bool _switch) external onlyOwner {
        s.isApprovedForSbt[_address] = _switch;
    }
    function checkApprovedForSbtTransfer(address _address) external view returns (bool) {
        return s.isApprovedForSbt[_address];
    }

    function updateBaseURI(string memory _baseURI) external onlyOwner {
        ERC721MetadataStorage.layout().baseURI = _baseURI;
    }

    ///@dev Override tokenURI to use evolutionId to generate standard images, metadata is stored on chain
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721Metadata, IERC721Metadata) returns (string memory) {
        if (!_exists(tokenId)) revert ERC721Metadata__NonExistentToken();
        string memory evolutionIdAsString = _uintToString(s.cantomon[s.gameVersion].evoStats[tokenId].evolutionId);
        string memory baseURI = ERC721MetadataStorage.layout().baseURI;
        return string(abi.encodePacked(baseURI, evolutionIdAsString));
    }

    function _uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits--;
            buffer[digits] = bytes1(uint8(48 + (value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

}

