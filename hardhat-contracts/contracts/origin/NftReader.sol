// SPDX-License-Identifier: MIT
/// @title: NFT Reader
/// @author: PxGnome
/// @notice: This contract is used to read NFTs and send information to another chain
/// @dev: This is Version 0.1
pragma solidity ^0.8.19;

// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";

import "@hyperlane-xyz/core/contracts/interfaces/IMailbox.sol";
import "@hyperlane-xyz/core/contracts/interfaces/IInterchainGasPaymaster.sol";

import "../interfaces/ITestMailbox.sol";


contract NftReader is Ownable {
    IMailbox outbox;
    bytes32 mailboxRecepient;
    IInterchainGasPaymaster igp = IInterchainGasPaymaster(0xF90cB82a76492614D07B82a7658917f3aC811Ac1);
    uint256 gasAmount = 50000;
    event SentMessage(uint32 destinationDomain, bytes32 recipient, string message);

    constructor(address _outbox) {
        setOutbox(_outbox);
    }

    function setGasAmount(uint256 _gasAmount) public onlyOwner {
        gasAmount = _gasAmount;
    }
    
    function setIgp(address _igp) public onlyOwner {
        igp = IInterchainGasPaymaster(_igp);
    }

    function setOutbox(address _outbox) public onlyOwner {
        outbox = IMailbox(_outbox);
    }

    function quoteGasPayment(
      uint32 _destinationDomain,
      uint256 _gasAmount
    ) public view returns (uint256) {
        return igp.quoteGasPayment(_destinationDomain, _gasAmount);
    }

    function setMailboxRecepient(bytes32 _addr) public onlyOwner {
        mailboxRecepient = _addr;
    }

    ///@dev Send NFT information here to be sent to another chain
    function portNft(
        uint32 _destinationDomain, 
        address _nftAddress,
        uint _tokenId 
    ) public payable {
        require(msg.value >= quoteGasPayment(_destinationDomain, gasAmount));
        require(IERC721(_nftAddress).ownerOf(_tokenId) == msg.sender, "NftReader: Message needs to be from owner of NFT");

        string memory message = string(abi.encode(msg.sender, _nftAddress, _tokenId));
        
        _sendString(_destinationDomain, mailboxRecepient, message);
    }

    function portNftTest(
        uint32 _destinationDomain, 
        address _nftAddress,
        uint _tokenId,
        address _receiveAddr
    ) public payable onlyOwner {
        require(msg.value > 0); // Since can't get the actual estimation
        require(IERC721(_nftAddress).ownerOf(_tokenId) == msg.sender, "NftReader: Message needs to be from owner of NFT");

        bytes memory message = abi.encode(msg.sender, _nftAddress, _tokenId);
        
        bytes32 addr = bytes32(abi.encode(address(this)));

        ITestMailbox(_receiveAddr).handle(0, addr, message);
    }

    function _sendString(
        uint32 _destinationDomain,
        bytes32 _recipient,
        string memory _message
    ) internal {
        bytes32 messageId = outbox.dispatch(_destinationDomain, _recipient, bytes(_message));
        igp.payForGas{ value: msg.value }(
            messageId, // The ID of the message that was just dispatched
            _destinationDomain, // The destination domain of the message
            50000, // 50k gas to use in the recipient's handle function
            msg.sender // refunds go to msg.sender, who paid the msg.value
        );
        emit SentMessage(_destinationDomain, _recipient, _message);
    }


    
}
