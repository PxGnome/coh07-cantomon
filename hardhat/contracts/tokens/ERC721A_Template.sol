// SPDX-License-Identifier: MIT
/// @title: ERC721A Contract template
/// @author: Alter Horizons
/// @notice: Find out more at https://alterhorizons.com
/// @dev: This is Version 1.0

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

import "erc721a/contracts/extensions/ERC721AQueryable.sol";

contract ERC721A_Template is ERC721AQueryable, Ownable {
    using Strings for uint256;

    // NFT Parameters
    uint256 public PRICE = 0.1 ether;
    uint256 public MAX_SUPPLY = 10000;
    uint256 public REVEAL_TIMESTAMP;
    // NFT Variables
    bool public MINT_OPEN = false;
    string baseURI;

    constructor(string memory _name, string memory _symbol, string memory _uri, uint256 _timestamp) ERC721A(_name, _symbol) {
        setBaseURI(_uri);
        setRevealTimestamp(_timestamp);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function getBaseURI() external view returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _uri) public onlyOwner {
        baseURI = _uri;
    }

    function setMintOpen(bool _isOpen) public onlyOwner {
        MINT_OPEN = _isOpen;
    }

    function setRevealTimestamp(uint256 _timestamp) public onlyOwner {
        REVEAL_TIMESTAMP = _timestamp;
    }


    function setPrice(uint256 _newPrice) external onlyOwner {
        PRICE = _newPrice;
    }

    function mint(address _to, uint256 _amount) public payable {
        require(MINT_OPEN, "Minting is not open");
        require(_amount > 0 && totalSupply() + _amount <= MAX_SUPPLY, "Amount invalid");
        require(msg.value >= PRICE, "Ether value sent is not correct");
        _mint(_to, _amount);
    }

    function _random(uint256 timestamp, uint256 tokenId) internal view returns (uint256) {
        uint256 newTokenId = (uint256(keccak256(abi.encodePacked(timestamp))) + tokenId) % (totalSupply());
        return newTokenId;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721A, IERC721A) returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        if (REVEAL_TIMESTAMP == 0) return baseURI;

        string memory _tokenURI = "";
        if (bytes(baseURI).length > 0) {
            _tokenURI = string(abi.encodePacked(baseURI, _random(REVEAL_TIMESTAMP, tokenId).toString()));
        }
        return _tokenURI;
    }

    function withdrawAll(address _to) public onlyOwner {
        (bool success, ) = _to.call{ value: address(this).balance }("");
        require(success, "Withdrawal failed");
    }

    function withdrawTokens(IERC20 token) public onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        token.transfer(_msgSender(), balance);
    }
}