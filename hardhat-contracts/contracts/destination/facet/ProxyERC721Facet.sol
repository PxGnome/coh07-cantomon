// SPDX-License-Identifier: MIT

/// @title: Proxy ERC721 Facet
/// @author: PxGnome
/// @notice: This contract is a proxy factory for SBTs. It is used to mint SBTs based upon messages from the bridge.
/// @dev: This is Version 0.1

pragma solidity ^0.8.19;

// import "hardhat/console.sol";

import "@hyperlane-xyz/core/contracts/interfaces/IMailbox.sol";
import "@solidstate/contracts/token/ERC721/SolidStateERC721.sol";

import "../../libraries/LibAppStorage.sol";

contract ProxyERC721Facet is CantomonModifiers, SolidStateERC721 {
    //MESSAGE RELAYING (HYPERLANE) BELOW
    function setApprovedMessenger(bytes32 _addr) public onlyOwner {
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

        s.nextCantomonId = cantomonId + 1;
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
        s.proxySbt[_tokenId].isUnbound = _switch;
        emit SwitchUnbound(_tokenId, _switch);
    }
    
    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal virtual override(SolidStateERC721) {
        if (!s.proxySbt[_tokenId].isUnbound) {
            require(
                _from == address(0) || _to == address(0),
                "ProxySbtFactory: This a Soulbound token. It cannot be transferred"
            );
        }
        super._beforeTokenTransfer(_from, _to, _tokenId);
    }

}
