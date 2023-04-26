// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.8.0;

interface ITestMailbox {
    function sendMessage(uint32 _destinationDomain, bytes32 _recipient, string memory _message) external payable;
    function handle(uint32 _origin, bytes32 _sender, bytes calldata _message) external;
}